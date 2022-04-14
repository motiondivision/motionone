const baseConfig = require("config/jest.config")

/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
  ...baseConfig,
  preset: "solid-jest/preset/browser",
  setupFilesAfterEnv: [
    "<rootDir>/../../config/jest.setup.js",
    "<rootDir>/../jest.setup.ts",
  ],
}

module.exports = config
