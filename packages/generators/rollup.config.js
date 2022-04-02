const { createDistBuild, createSizeBuild } = require("config/rollup.config")
const pkg = require("./package.json")

const sizeBundles = [
  ["glide/index.js", "size-glide.js"],
  ["spring/index.js", "size-spring.js"],
].map(([input, output]) =>
  createSizeBuild({ input: `lib/${input}`, output: `dist/${output}` }, pkg)
)

module.exports = [...createDistBuild(pkg), ...sizeBundles]
