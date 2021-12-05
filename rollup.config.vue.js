import fs from "fs"
import path from "path"
import vue from "rollup-plugin-vue"
import alias from "@rollup/plugin-alias"
import commonjs from "@rollup/plugin-commonjs"
import resolve from "@rollup/plugin-node-resolve"
import replace from "@rollup/plugin-replace"
import babel from "@rollup/plugin-babel"
import { terser } from "rollup-plugin-terser"
import ttypescript from "ttypescript"
import typescript from "rollup-plugin-typescript2"
import minimist from "minimist"
import babelConfig from "./babel.config.cjs"

// Get browserslist config and remove ie from es build targets
const esbrowserslist = fs
  .readFileSync("./.browserslistrc")
  .toString()
  .split("\n")
  .filter((entry) => entry && entry.substring(0, 2) !== "ie")

// Extract babel preset-env config, to combine with esbrowserslist
const babelPresetEnvConfig = babelConfig.presets.filter(
  (entry) => entry[0] === "@babel/preset-env"
)[0][1]

const argv = minimist(process.argv.slice(2))

const projectRoot = path.resolve(__dirname, "..")

const baseConfig = {
  input: "src/vue-entry.ts",
  plugins: {
    preVue: [
      alias({
        entries: [
          {
            find: "@",
            replacement: `${path.resolve(projectRoot, "src")}`,
          },
        ],
      }),
    ],
    replace: {
      preventAssignment: true,
      "process.env.NODE_ENV": JSON.stringify("production"),
    },
    vue: {
      css: true,
      template: {
        isProduction: true,
      },
    },
    postVue: [
      resolve({
        extensions: [".js", ".jsx", ".ts", ".tsx", ".vue"],
      }),
      commonjs(),
    ],
    babel: {
      exclude: "node_modules/**",
      extensions: [".js", ".jsx", ".ts", ".tsx", ".vue"],
      babelHelpers: "bundled",
    },
  },
}

// ESM/UMD/IIFE shared settings: externals
// Refer to https://rollupjs.org/guide/en/#warning-treating-module-as-external-dependency
const external = ["vue"]

// UMD/IIFE shared settings: output.globals
// Refer to https://rollupjs.org/guide/en#output-globals for details
const globals = {
  vue: "Vue",
}

// Customize configs for individual targets
const buildFormats = []
if (!argv.format || argv.format === "es") {
  const esConfig = {
    ...baseConfig,
    input: "src/vue-entry.ts",
    external,
    output: {
      file: "dist/motion-vue.esm.js",
      format: "esm",
      exports: "named",
    },
    plugins: [
      replace(baseConfig.plugins.replace),
      ...baseConfig.plugins.preVue,
      vue(baseConfig.plugins.vue),
      ...baseConfig.plugins.postVue,
      // Only use typescript for declarations - babel will
      // do actual js transformations
      typescript({
        typescript: ttypescript,
        useTsconfigDeclarationDir: true,
        emitDeclarationOnly: true,
      }),
      babel({
        ...baseConfig.plugins.babel,
        presets: [
          [
            "@babel/preset-env",
            {
              ...babelPresetEnvConfig,
              targets: esbrowserslist,
            },
          ],
        ],
      }),
    ],
  }
  buildFormats.push(esConfig)
}

if (!argv.format || argv.format === "cjs") {
  const umdConfig = {
    ...baseConfig,
    external,
    output: {
      compact: true,
      file: "dist/motion-vue.ssr.js",
      format: "cjs",
      name: "Motion",
      exports: "auto",
      globals,
    },
    plugins: [
      replace(baseConfig.plugins.replace),
      ...baseConfig.plugins.preVue,
      vue({
        ...baseConfig.plugins.vue,
        template: {
          ...baseConfig.plugins.vue.template,
          optimizeSSR: true,
        },
      }),
      ...baseConfig.plugins.postVue,
      babel(baseConfig.plugins.babel),
    ],
  }
  buildFormats.push(umdConfig)
}

if (!argv.format || argv.format === "iife") {
  const unpkgConfig = {
    ...baseConfig,
    external,
    output: {
      compact: true,
      file: "dist/motion-vue.min.js",
      format: "iife",
      name: "Motion",
      exports: "auto",
      globals,
    },
    plugins: [
      replace(baseConfig.plugins.replace),
      ...baseConfig.plugins.preVue,
      vue(baseConfig.plugins.vue),
      ...baseConfig.plugins.postVue,
      babel(baseConfig.plugins.babel),
      terser({
        output: {
          ecma: 5,
        },
      }),
    ],
  }
  buildFormats.push(unpkgConfig)
}

// Export config
export default buildFormats
