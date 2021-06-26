import { displacement } from "./displacement"
import { magnitude } from "./magnitude"
import { Point } from "./types/point"

export function distance(a: Point, b: Point) {
  return magnitude(displacement(a, b))
}
