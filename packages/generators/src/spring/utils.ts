import { defaults } from "./defaults"

export const calcDampingRatio = (
  stiffness = defaults.stiffness,
  damping = defaults.damping,
  mass = defaults.mass
): number => damping / (2 * Math.sqrt(stiffness * mass))
