module.exports = {
  extends: ["next", "prettier"],
  settings: {
    next: {
      rootDir: [
        "apps/docs/",
        "apps/web/",
        "packages/uix/",
        "packages/config/",
        "packages/tsconfig/",
      ],
    },
  },
};
