import type { BezierDefinition, Easing } from "@motionone/types"
import { isCubicBezier } from "@motionone/utils"

export const convertEasing = (easing: Easing) =>
  isCubicBezier(easing) ? cubicBezierAsString(easing) : easing

export const cubicBezierAsString = ([a, b, c, d]: BezierDefinition) =>
  `cubic-bezier(${a}, ${b}, ${c}, ${d})`
