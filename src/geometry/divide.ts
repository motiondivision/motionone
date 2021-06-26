import { Vector } from "./types/vector"
import { multiply } from "./multiply"

export function divide(vector: Vector, value: number): Vector {
  return multiply(vector, 1 / value)
}
