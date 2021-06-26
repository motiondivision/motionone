import { divide } from "./divide"
import { magnitude } from "./magnitude"
import { Vector } from "./types/vector"

export function normalize(vector: Vector): Vector {
  return divide(vector, magnitude(vector))
}
