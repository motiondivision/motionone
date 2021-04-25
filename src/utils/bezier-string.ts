import { BezierDefinition } from "../dom/types"

export function convertToBezierString([a, b, c, d]: BezierDefinition): string {
  return `cubic-bezier(${a}, ${b}, ${c}, ${d})`
}
