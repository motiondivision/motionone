import { wrap } from "popmotion"
import { isEasingList } from "../../dom/utils/easing"

export function getEasingForSegment<T>(easing: T | T[], i: number) {
  return isEasingList(easing as any)
    ? easing[wrap(0, (easing as T[]).length, i)]
    : easing
}
