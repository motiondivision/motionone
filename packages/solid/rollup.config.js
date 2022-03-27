const { createDistBuild, createSizeBuild } = require("config/rollup.config")
const pkg = require("./package.json")
const withSolid = require("rollup-preset-solid").default;

module.exports = withSolid([
  ...createDistBuild(pkg),
  createSizeBuild({ input: "lib/index.js", output: "dist/size.js" }, pkg),
]);
