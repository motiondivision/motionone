import type { SpringOptions } from "./types"
import { spring as createSpringGenerator } from "@motionone/generators"
import { createGeneratorEasing } from "../utils/create-generator-easing"

export const spring = createGeneratorEasing<SpringOptions>(
  createSpringGenerator
)
