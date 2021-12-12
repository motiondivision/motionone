const baseConfig = require("config/jest.config")

/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
  ...baseConfig,
  transform: {
    "^.+\\.vue$": "@vue/vue3-jest",
    "^.+\\.ts$": "ts-jest",
  },
  moduleFileExtensions: ["js", "ts", "vue"],
}

module.exports = config
