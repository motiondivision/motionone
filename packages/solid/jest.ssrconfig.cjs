const baseConfig = require("config/jest.config")

/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
  ...baseConfig,
  preset: "solid-jest/preset/node",
  testMatch: ["**/__tests__/**/ssr.test.(js|ts)?(x)"],
}

module.exports = config
