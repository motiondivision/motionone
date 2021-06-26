import resolve from "@rollup/plugin-node-resolve"
import { terser } from "rollup-plugin-terser"
import replace from "@rollup/plugin-replace"
import commonjs from "@rollup/plugin-commonjs"
import * as react from "react"
import * as reactDom from "react-dom"
import pkg from "./package.json"

const config = {
  input: "lib/index.js",
}

const external = [
  ...Object.keys(pkg.dependencies || {}),
  ...Object.keys(pkg.peerDependencies || {}),
  ...Object.keys(pkg.optionalDependencies || {}),
]

const pureClass = {
  transform(code) {
    // Replace TS emitted @class function annotations with PURE so terser
    // can remove them
    return code.replace(/\/\*\* @class \*\//g, "/*@__PURE__*/")
  },
}

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
      "process.env.NODE_ENV": JSON.stringify("production"),
    }),
    pureClass,
    terser({ output: { comments: false } }),
  ],
})

const cjs = Object.assign({}, config, {
  output: {
    file: `dist/${pkg.name}.cjs.js`,
    format: "cjs",
    exports: "named",
  },
  plugins: [
    resolve(),
    commonjs({
      namedExports: {
        react: Object.keys(react),
        "react-dom": Object.keys(reactDom),
      },
    }),
  ],
  external,
})

const es = Object.assign({}, config, {
  output: {
    format: "es",
    exports: "named",
    preserveModules: true,
    dir: "dist/es",
  },
  plugins: [
    resolve(),
    commonjs({
      namedExports: {
        react: Object.keys(react),
        "react-dom": Object.keys(reactDom),
      },
    }),
  ],
  external,
})

export default [umd, umdProd, cjs, es]
