import { wrap } from "popmotion"

export function getEasingForSegment<T>(easing: T | T[], i: number) {
  return Array.isArray(easing) ? easing[wrap(0, easing.length, i)] : easing
}
