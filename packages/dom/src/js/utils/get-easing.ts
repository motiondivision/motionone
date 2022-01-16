import { wrap } from "@motionone/utils"
import { isEasingList } from "../../animate/utils/easing"

export function getEasingForSegment<T>(easing: T | T[], i: number) {
  return isEasingList(easing as any)
    ? easing[wrap(0, (easing as T[]).length, i)]
    : easing
}
