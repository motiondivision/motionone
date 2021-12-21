module.exports = {
  extends: ["next", "prettier"],
  settings: {
    next: {
      rootDir: [
        "sites/web/",
        "sites/playground-vue/",
        "packages/config/",
        "packages/dom/",
        "packages/motion/",
        "packages/react/",
        "packages/svelte/",
        "packages/vue/",
      ],
    },
  },
  rules: {
    "react/no-unescaped-entities": "off",
    "react-hooks/exhaustive-deps": "off",
  },
}
