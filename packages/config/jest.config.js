/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
  rootDir: "src",
  preset: "ts-jest",
  testEnvironment: "jsdom",
  collectCoverageFrom: [
    "**/*.{js,jsx,ts,tsx}",
    "!**/node_modules/**",
    "!**/__tests__/**",
  ],
  testMatch: ["**/__tests__/**/*.test.(js|ts)?(x)"],
  coverageDirectory: "<rootDir>/../coverage",
  coveragePathIgnorePatterns: ["supported-elements.ts", "src/index.ts"],
}

module.exports = config
