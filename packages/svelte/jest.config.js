import baseConfig from "config/jest.config.js"

/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
  ...baseConfig,
  transform: {
    "^.+\\.svelte$": ["svelte-jester", { preprocess: true }],
    "^.+\\.ts$": "ts-jest",
  },
  moduleFileExtensions: ["js", "ts", "svelte"],
}

export default config
