import { wrap } from "../../utils/wrap.js"
import { isEasingList } from "../../dom/utils/easing.js"

export function getEasingForSegment<T>(easing: T | T[], i: number) {
  return isEasingList(easing as any)
    ? easing[wrap(0, (easing as T[]).length, i)]
    : easing
}
