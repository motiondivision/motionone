import type { GlideOptions } from "./types"
import { glide as createGlideGenerator } from "@motionone/generators"
import { createGeneratorEasing } from "../utils/create-generator-easing"

export const glide = createGeneratorEasing<GlideOptions>(createGlideGenerator)
