import type { GlideOptions } from "./types"
import { createGlideGenerator } from "./generator"
import { createGeneratorEasing } from "../utils/create-generator-easing.js"

export const glide = createGeneratorEasing<GlideOptions>(createGlideGenerator)
