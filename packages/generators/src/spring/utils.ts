import { defaults } from "./defaults"

export const calcDampingRatio = (
  stiffness = defaults.stiffness,
  damping = defaults.damping,
  mass = defaults.mass
): number => damping / (2 * Math.sqrt(stiffness * mass))

export const calcAngularFreq = (undampedFreq: number, dampingRatio: number) =>
  undampedFreq * Math.sqrt(1 - dampingRatio * dampingRatio)
