module.exports = (pkg) => {
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
}
