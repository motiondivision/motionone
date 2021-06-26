import { multiply } from "./multiply"
import { normalize } from "./normalize"
import { subtract } from "./subtract"
import { Vector } from "./types/vector"

export function dotProduct(a: Vector, b: Vector): number {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]
}

export function parallel(a: Vector, b: Vector) {
  const unitA = normalize(a)
  return multiply(unitA, dotProduct(unitA, b))
}

export function perp(a: Vector, b: Vector) {
  return subtract(b, parallel(a, b))
}

export function angle(a: Vector, b: Vector) {
  return Math.acos(dotProduct(normalize(a), normalize(b)))
}
