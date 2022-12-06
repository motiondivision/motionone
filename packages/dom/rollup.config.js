const resolve = require("@rollup/plugin-node-resolve").default
const { createDistBuild, createSizeBuild } = require("config/rollup.config")
const pkg = require("./package.json")

const sizeBundles = [
  ["animate/index.js", "size-animate.js"],
  ["animate/animate-style.js", "size-animate-style.js"],
  ["timeline/index.js", "size-timeline.js"],
  ["easing/spring/index.js", "size-spring.js"],
  ["gestures/in-view.js", "size-in-view.js"],
  ["gestures/scroll/index.js", "size-scroll.js"],
  ["gestures/resize/index.js", "size-resize.js"],
].map(([input, output]) =>
  createSizeBuild({ input: `lib/${input}`, output: `dist/${output}` }, pkg)
)

const umd = {
  input: "lib/index.js",
  output: {
    file: `dist/motion-umd.dev.js`,
    format: "umd",
    name: "Motion",
    exports: "named",
  },
  plugins: [resolve()],
}

module.exports = [...createDistBuild(pkg), ...sizeBundles, umd]
