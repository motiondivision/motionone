import { Vector } from "./types/vector"

export function multiply(vector: Vector, value: number): Vector {
  return [vector[0] * value, vector[1] * value, vector[0] * value]
}
