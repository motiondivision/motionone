const { createDistBuild, createSizeBuild } = require("config/rollup.config")
const pkg = require("./package.json")

const sizeBundles = [["index.js", "size-index.js"]].map(([input, output]) =>
  createSizeBuild({ input: `lib/${input}`, output: `dist/${output}` }, pkg)
)

module.exports = [...createDistBuild(pkg), ...sizeBundles]
