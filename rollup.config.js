import svelte from "rollup-plugin-svelte"
import fs from "fs"
import resolve from "@rollup/plugin-node-resolve"
import { terser } from "rollup-plugin-terser"
import replace from "@rollup/plugin-replace"
import pkg from "./package.json"
import sveltePreprocess from "svelte-preprocess"
import css from "rollup-plugin-css-only"
import typescript from "@rollup/plugin-typescript"
import commonjs from "@rollup/plugin-commonjs"

const production = !process.env.ROLLUP_WATCH

const config = {
  input: "lib/index.js",
}

const external = [
  ...Object.keys(pkg.dependencies || {}),
  ...Object.keys(pkg.peerDependencies || {}),
]

const umd = Object.assign({}, config, {
  output: {
    file: `dist/${pkg.name}.umd.js`,
    format: "umd",
    name: "Motion",
    exports: "named",
    globals: { react: "React" },
  },
  external: ["react", "react-dom"],
  plugins: [
    resolve(),
    replace({
      preventAssignment: true,
      "process.env.NODE_ENV": JSON.stringify("development"),
    }),
  ],
})

const umdProd = Object.assign({}, umd, {
  output: Object.assign({}, umd.output, {
    file: `dist/${pkg.name}.min.js`,
  }),
  plugins: [
    resolve(),
    replace({
      preventAssignment: true,
      "process.env.NODE_ENV": JSON.stringify("production"),
    }),
    terser({ output: { comments: false } }),
  ],
})

const distEntries = {
  main: "lib/index.js",
  react: "lib/react-entry.js",
}

const dist = {
  input: distEntries,
  output: ["cjs", "es"].map((format) => ({
    dir: "dist",
    format,
    exports: "named",
    entryFileNames: "[name].[format].js",
    preserveModules: true,
  })),
  external,
  plugins: [
    {
      name: "emit-proxy-package-jsons",
      async buildEnd() {
        const extraEntryNames = Object.keys(distEntries).filter(
          (entyrName) => entyrName !== "main"
        )

        for (const entryName of extraEntryNames) {
          try {
            await fs.promises.mkdir(entryName)
          } catch (err) {
            if (!err || err.code !== "EEXIST") {
              throw err
            }
          }

          await fs.promises.writeFile(
            `${entryName}/package.json`,
            JSON.stringify(
              {
                private: true,
                main: `../dist/${entryName}.cjs.js`,
                module: `../dist/${entryName}.es.js`,
                types: `../types/${entryName}-entry.d.ts`,
              },
              null,
              2
            ) + "\n"
          )
        }
      },
    },
  ],
}

const distSvelte = {
  input: "src/svelte-entry.ts",
  output: {
    sourcemap: true,
    format: "es",
    file: "dist/svelte.js",
  },
  plugins: [
    svelte({
      preprocess: sveltePreprocess({ sourceMap: !production }),
      compilerOptions: {
        // enable run-time checks when not in production
        dev: !production,
      },
    }),
    // we'll extract any component CSS out into
    // a separate file - better for performance
    css({ output: "bundle.css" }),

    typescript({
      sourceMap: !production,
      inlineSources: !production,
    }),

    // If you have external dependencies installed from
    // npm, you'll most likely need these plugins. In
    // some cases you'll need additional configuration -
    // consult the documentation for details:
    // https://github.com/rollup/plugins/tree/master/packages/commonjs
    resolve({
      browser: true,
      dedupe: ["svelte"],
    }),
    commonjs(),

    // // In dev mode, call `npm run start` once
    // // the bundle has been generated
    // !production && serve(),

    // // Watch the `public` directory and refresh the
    // // browser on changes when not in production
    // !production && livereload("public"),

    // // If we're building for production (npm run build
    // // instead of npm run dev), minify
    // production && terser(),
  ],
  watch: {
    clearScreen: false,
  },
}

const createSizeBuild = ({ input, output }, plugins = []) => ({
  input,
  output: {
    format: "es",
    exports: "named",
    file: output,
  },
  plugins: [resolve(), ...plugins, terser({ output: { comments: false } })],
  external: [...Object.keys(pkg.peerDependencies || {})],
})

const sizeReact = createSizeBuild({
  input: "lib/react/index.js",
  output: "dist/size-react.js",
})

const sizeAnimateDom = createSizeBuild({
  input: "lib/dom/animate.js",
  output: "dist/size-animate-dom.js",
})

const sizeAnimateStyle = createSizeBuild({
  input: "lib/dom/animate-style.js",
  output: "dist/size-animate-style.js",
})

const sizeTimelineDom = createSizeBuild({
  input: "lib/dom/timeline/index.js",
  output: "dist/size-timeline-dom.js",
})

const sizeSpring = createSizeBuild({
  input: "lib/js/easing/spring/index.js",
  output: "dist/size-spring.js",
})

export default [
  dist,
  distSvelte,
  umd,
  umdProd,
  sizeAnimateDom,
  sizeTimelineDom,
  sizeAnimateStyle,
  sizeSpring,
  sizeReact,
]
