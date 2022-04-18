const baseConfig = require("config/jest.config")

/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
  ...baseConfig,
  preset: "solid-jest/preset/browser",
  setupFilesAfterEnv: ["<rootDir>/../jest.setup.js"],
  testPathIgnorePatterns: ["/node_modules/", "ssr"],
}

module.exports = config
