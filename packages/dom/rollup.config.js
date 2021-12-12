const config = require("config/rollup.config")
const resolve = require("@rollup/plugin-node-resolve").default
const { terser } = require("rollup-plugin-terser")
const pkg = require("./package.json")

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

const sizeBundles = [
  ["animate/index.js", "size-animate.js"],
  ["animate/animate-style.js", "size-animate-style.js"],
  ["timeline/index.js", "size-timeline.js"],
  ["js/easing/spring/index.js", "size-spring.js"],
].map(([input, output]) =>
  createSizeBuild({ input: `lib/${input}`, output: `dist/${output}` })
)

module.exports = [...config(pkg), ...sizeBundles]
