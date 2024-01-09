module.exports = {
  extends: ["next", "prettier"],
  settings: {
    next: {
      rootDir: [
        "sites/web/",
        "packages/config/",
        "packages/dom/",
        "packages/motion/",
      ],
    },
  },
  rules: {
    "react/no-unescaped-entities": "off",
    "react-hooks/exhaustive-deps": "off",
  },
}
