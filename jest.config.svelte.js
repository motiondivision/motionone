/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
  rootDir: "src",
  preset: "ts-jest",
  testEnvironment: "jsdom",
  testMatch: ["**/svelte/**/__tests__/**/*.test.(js|ts)?(x)"],
  coveragePathIgnorePatterns: [
    "src/targets/react/utils/supported-elements.ts",
    "src/index.ts",
    "src/react-entry.ts",
    "src/svelte-entry.ts",
  ],
  collectCoverageFrom: ["<rootDir>/svelte"],
  coverageDirectory: "<rootDir>/../coverage/svelte",
  transform: {
    "^.+\\.svelte$": ["svelte-jester", { preprocess: true }],
    "^.+\\.ts$": "ts-jest",
  },
  moduleFileExtensions: ["js", "ts", "svelte"],
}

module.exports = config
