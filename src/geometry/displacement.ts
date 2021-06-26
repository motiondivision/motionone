import { subtract } from "./subtract"
import { Vector } from "./types/vector"

export function displacement(a: Vector, b: Vector) {
  return subtract(b, a)
}
