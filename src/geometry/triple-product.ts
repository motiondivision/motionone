import { crossProduct } from "./cross-product"
import { dotProduct } from "./dot-product"
import { Vector } from "./types/vector"

export function tripleProduct(a: Vector, b: Vector, c: Vector) {
  return dotProduct(a, crossProduct(b, c))
}
