import { Vector } from "./types/vector"

const squared = (value: number) => Math.pow(value, 2)

export function magnitude(vector: Vector) {
  return Math.sqrt(squared(vector[0]) + squared(vector[1]) + squared(vector[2]))
}
