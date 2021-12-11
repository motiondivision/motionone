module.exports = {
  extends: ["next", "prettier"],
  settings: {
    next: {
      rootDir: [
        "sites/web/",
        "packages/config/",
        "packages/dom/",
        "packages/motion/",
        "packages/react/",
        "packages/svelte/",
        "packages/vue/",
      ],
    },
  },
}
