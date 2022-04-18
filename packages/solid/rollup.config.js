const { createDistBuild, createSizeBuild } = require("config/rollup.config")
const pkg = require("./package.json")
const withSolid = require("rollup-preset-solid").default

module.exports = [
  withSolid({
    targets: ["esm", "cjs"],
    input: "src/index.ts",
    printInstructions: true,
  }),
  createSizeBuild({ input: "dist/esm/index.js", output: "dist/size.js" }, pkg),
]
