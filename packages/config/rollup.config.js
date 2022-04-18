const resolve = require("@rollup/plugin-node-resolve").default
const { terser } = require("rollup-plugin-terser")

module.exports = {
  createDistBuild: (pkg) => {
    const external = [
      ...Object.keys(pkg.dependencies || {}),
      ...Object.keys(pkg.peerDependencies || {}),
    ]

    return [
      {
        input: "lib/index.js",
        output: ["cjs", "es"].map((format) => ({
          dir: "dist",
          format,
          exports: "named",
          entryFileNames: "[name].[format].js",
          preserveModules: true,
        })),
        external,
      },
    ]
  },
  createSizeBuild: ({ input, output }, pkg, plugins = [], external = []) => ({
    input,
    output: {
      format: "es",
      exports: "named",
      file: output,
    },
    plugins: [resolve(), ...plugins, terser({ output: { comments: false } })],
    external: [...Object.keys(pkg.peerDependencies || {}), ...external],
  }),
}
