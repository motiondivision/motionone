const path = require("path")

module.exports = {
  mode: "production",
  entry: {
    "size-webpack-animate": path.join(
      __dirname,
      "./lib/targets/dom/animate.js"
    ),
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
    library: {
      type: "module",
    },
  },
  experiments: {
    outputModule: true,
  },
}
