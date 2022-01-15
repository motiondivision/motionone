import svelte from "rollup-plugin-svelte"
import resolve from "@rollup/plugin-node-resolve"
import sveltePreprocess from "svelte-preprocess"
import css from "rollup-plugin-css-only"
import replace from "@rollup/plugin-replace"
import typescript from "@rollup/plugin-typescript"
import commonjs from "@rollup/plugin-commonjs"

const production = !process.env.ROLLUP_WATCH

const dist = {
  input: "src/index.ts",
  output: {
    sourcemap: true,
    format: "es",
    file: "dist/index.js",
  },
  plugins: [
    replace({
      preventAssignment: true,
      "process.env.NODE_ENV": JSON.stringify("production"),
    }),
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

export default [dist]
