const sveltePreprocess = require("svelte-preprocess")

module.exports = {
  preprocess: sveltePreprocess({
    tsconfigDirectory: "./",
    tsconfigFile: "tsconfig.json",
  }),
}
