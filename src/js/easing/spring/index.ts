import type { SpringOptions } from "./types"
import { createSpringGenerator } from "./generator"
import { createGeneratorEasing } from "../utils/create-generator-easing.js"

export const spring = createGeneratorEasing<SpringOptions>(
  createSpringGenerator
)
