import { defineConfig } from "vite"
import solid from "solid-start/vite"

export default defineConfig({
  plugins: [solid({ ssr: false })],
})
