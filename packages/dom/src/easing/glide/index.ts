import {
  glide as createGlideGenerator,
  GlideOptions,
} from "@motionone/generators"
import { createGeneratorEasing } from "../create-generator-easing"

export const glide = createGeneratorEasing<GlideOptions>(createGlideGenerator)
