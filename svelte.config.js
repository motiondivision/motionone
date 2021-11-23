import preprocess from "svelte-preprocess"

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: preprocess(),

  kit: {
    // hydrate the <div id="svelte"> element in src/app.html
    target: "#svelte",

    files: {
      lib: "src/svelte",
      routes: "svelte/dev",
      template: "svelte/app.html",
    },
  },
}

export default config
