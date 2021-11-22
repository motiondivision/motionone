import { GlideOptions } from "./types"
import { createGlideGenerator } from "./generator"
import { createGeneratorEasing } from "../utils/create-generator-easing"

export const glide = createGeneratorEasing<GlideOptions>(createGlideGenerator)
