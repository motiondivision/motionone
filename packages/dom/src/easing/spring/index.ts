import {
  spring as createSpringGenerator,
  SpringOptions,
} from "@motionone/generators"
export type { SpringOptions }
import { createGeneratorEasing } from "../create-generator-easing"

export const spring = createGeneratorEasing<SpringOptions>(
  createSpringGenerator
)
