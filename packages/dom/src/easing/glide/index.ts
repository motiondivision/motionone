import {
  glide as createGlideGenerator,
  GlideOptions,
} from "@motionone/generators"
export type { GlideOptions }
import { createGeneratorEasing } from "../create-generator-easing"

export const glide = createGeneratorEasing<GlideOptions>(createGlideGenerator)
