import { BezierDefinition } from "../types"

export const cubicBezierAsString = ([a, b, c, d]: BezierDefinition) =>
  `cubic-bezier(${a}, ${b}, ${c}, ${d})`
