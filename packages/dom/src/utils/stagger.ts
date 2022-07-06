import type { Easing, OptionResolver, EasingFunction } from "@motionone/types"
import { isNumber } from "@motionone/utils"
import { getEasingFunction } from "@motionone/animation"

export type From = "first" | "last" | "center" | number

export type StaggerOptions = {
  start?: number
  from?: From
  easing?: EasingFunction | Easing
}

export function stagger(
  duration: number = 0.1,
  { start = 0, from = 0, easing }: StaggerOptions = {}
): OptionResolver<number> {
  return (i: number, total: number) => {
    const fromIndex = isNumber(from) ? from : getFromIndex(from, total)
    const distance = Math.abs(fromIndex - i)
    let delay = duration * distance

    if (easing) {
      const maxDelay = total * duration
      const easingFunction = getEasingFunction(easing)
      delay = easingFunction(delay / maxDelay) * maxDelay
    }

    return start + delay
  }
}

export function getFromIndex(from: From, total: number) {
  if (from === "first") {
    return 0
  } else {
    const lastIndex = total - 1
    return from === "last" ? lastIndex : lastIndex / 2
  }
}

export function resolveOption<T>(
  option: T | OptionResolver<T>,
  i: number,
  total: number
) {
  return typeof option === "function"
    ? (option as OptionResolver<T>)(i, total)
    : option
}
