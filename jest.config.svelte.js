/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
  rootDir: "src",
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/../jest.setup.tsx"],
  testMatch: ["**/svelte/**/__tests__/**/*.test.(js|ts)?(x)"],
  coveragePathIgnorePatterns: [
    "src/targets/react/utils/supported-elements.ts",
    "src/index.ts",
    "src/react-entry.ts",
    "src/svelte-entry.ts",
  ],
  collectCoverageFrom: [],
  coverageDirectory: "<rootDir>/../coverage/svelte",
  setupFilesAfterEnv: ["<rootDir>/../jest.setup.svelte.ts"],
  transform: {
    "^.+\\.svelte$": ["svelte-jester", { preprocess: true }],
    "^.+\\.ts$": "ts-jest",
  },
  moduleFileExtensions: ["js", "ts", "svelte"],
}

export default config
