const baseConfig = require("config/jest.config")

/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
  ...baseConfig,
  setupFilesAfterEnv: ["<rootDir>/../jest.setup.js"],
}

module.exports = config
