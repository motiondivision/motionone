import { Easing, EasingFunction } from "@motionone/types"
import { isEasingList } from "./is-easing-list"
import { wrap } from "./wrap"

export function getEasingForSegment(
  easing: Easing | Easing[],
  i: number
): Easing
export function getEasingForSegment(
  easing: EasingFunction | EasingFunction[],
  i: number
): EasingFunction
export function getEasingForSegment(
  easing: Easing | Easing[] | EasingFunction | EasingFunction[],
  i: number
) {
  return isEasingList(easing) ? easing[wrap(0, easing.length, i)] : easing
}
