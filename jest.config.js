// Sync object
/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
  rootDir: "src",
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/../jest.setup.tsx"],
  collectCoverageFrom: [
    "**/*.{js,jsx,ts,tsx}",
    "!**/node_modules/**",
    "!**/__tests__/**",
    "!**/svelte/**",
  ],
  testMatch: ["**/__tests__/**/*.test.(js|ts)?(x)"],
  modulePathIgnorePatterns: ["svelte"],
  coverageDirectory: "<rootDir>/../coverage",
  coveragePathIgnorePatterns: [
    "src/targets/react/utils/supported-elements.ts",
    "src/index.ts",
    "src/react-entry.ts",
    "src/svelte-entry.ts",
  ],
}

export default config
