import fs from "fs";
import resolve from "@rollup/plugin-node-resolve";
import { terser } from "rollup-plugin-terser";
import replace from "@rollup/plugin-replace";
import pkg from "./package.json";

const config = {
  input: "lib/index.js",
};

const external = [
  ...Object.keys(pkg.dependencies || {}),
  ...Object.keys(pkg.peerDependencies || {}),
];

const umd = Object.assign({}, config, {
  output: {
    file: `dist/${pkg.name}.umd.js`,
    format: "umd",
    name: "Motion",
    exports: "named",
  },
  plugins: [
    resolve(),
    replace({
      preventAssignment: true,
      "process.env.NODE_ENV": JSON.stringify("development"),
    }),
  ],
});

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
});

const distEntries = {
  main: "lib/index.js",
};

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
        );

        for (const entryName of extraEntryNames) {
          try {
            await fs.promises.mkdir(entryName);
          } catch (err) {
            if (!err || err.code !== "EEXIST") {
              throw err;
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
          );
        }
      },
    },
  ],
};

const createSizeBuild = ({ input, output }, plugins = []) => ({
  input,
  output: {
    format: "es",
    exports: "named",
    file: output,
  },
  plugins: [resolve(), ...plugins, terser({ output: { comments: false } })],
  external: [...Object.keys(pkg.peerDependencies || {})],
});

const sizeAnimateDom = createSizeBuild({
  input: "lib/index.js",
  output: "dist/size-index.js",
});

export default [dist, umd, umdProd, sizeAnimateDom];
