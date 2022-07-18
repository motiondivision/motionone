import { Easing, EasingFunction, EasingGenerator } from "@motionone/types"
import { isNumber } from "./is-number"

export const isEasingList = (
  easing: EasingGenerator | Easing | Easing[] | undefined | EasingFunction
): easing is Easing[] => Array.isArray(easing) && !isNumber(easing[0])
