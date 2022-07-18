import {
  BezierDefinition,
  Easing,
  EasingFunction,
  EasingGenerator,
} from "@motionone/types"
import { isNumber } from "./is-number"

export const isCubicBezier = (
  easing: EasingGenerator | Easing | Easing[] | EasingFunction
): easing is BezierDefinition => Array.isArray(easing) && isNumber(easing[0])
