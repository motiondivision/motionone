const { createDistBuild, createSizeBuild } = require("config/rollup.config")
const pkg = require("./package.json")

const sizeBundles = [
  ["animate/index.js", "size-animate.js"],
  ["animate/animate-style.js", "size-animate-style.js"],
  ["timeline/index.js", "size-timeline.js"],
  ["easing/spring/index.js", "size-spring.js"],
].map(([input, output]) =>
  createSizeBuild({ input: `lib/${input}`, output: `dist/${output}` }, pkg)
)

module.exports = [...createDistBuild(pkg), ...sizeBundles]
