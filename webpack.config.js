const tsconfig = require("./tsconfig.json")
const path = require("path")
// const convertPathsToAliases = require("convert-tsconfig-paths-to-webpack-aliases")
//   .default
const TerserPlugin = require("terser-webpack-plugin")

const tsLoader = {
  loader: "ts-loader",
  options: { transpileOnly: true },
}

module.exports = {
  mode: "production",
  entry: {
    "size-webpack-animate": path.join(
      __dirname,
      "./src/targets/dom/animate.ts"
    ),
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].js",
  },
  devtool: false,
  optimization: {
    usedExports: true,
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          output: { comments: false },
        },
      }),
    ],
  },
  resolve: {
    modules: ["node_modules"],
    extensions: [".ts", ".tsx", ".js", ".json"],
    // alias: convertPathsToAliases(tsconfig),
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: [/__tests__/, /node_modules/],
        use: [tsLoader],
      },
    ],
  },
}
