/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
  rootDir: "src",
  preset: "ts-jest",
  testEnvironment: "jsdom",
  testMatch: ["**/vue/**/__tests__/**/*.test.(js|ts)?(x)"],
  coveragePathIgnorePatterns: [
    "src/targets/react/utils/supported-elements.ts",
    "src/index.ts",
    "src/react-entry.ts",
    "src/vue-entry.ts",
  ],
  collectCoverageFrom: [],
  coverageDirectory: "<rootDir>/../coverage/vue",
  transform: {
    ".*\\.(vue)$": "vue-jest",
    "^.+\\.ts$": "ts-jest",
  },
  moduleFileExtensions: ["js", "ts", "vue"],
}

export default config
