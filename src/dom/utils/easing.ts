import type { BezierDefinition, CustomEasing, Easing } from "../types"
import { isNumber } from "../../utils/is-number"

export const isCubicBezier = (
  easing: Easing | Easing[]
): easing is BezierDefinition => Array.isArray(easing) && isNumber(easing[0])

export const isEasingList = (easing: Easing | Easing[]): easing is Easing[] =>
  Array.isArray(easing) && !isNumber(easing[0])

export const isCustomEasing = (
  easing: Easing | Easing[] | CustomEasing
): easing is CustomEasing =>
  typeof easing === "object" &&
  Boolean((easing as CustomEasing).createAnimation)

export const convertEasing = (easing: Easing) =>
  isCubicBezier(easing) ? cubicBezierAsString(easing) : easing

export const cubicBezierAsString = ([a, b, c, d]: BezierDefinition) =>
  `cubic-bezier(${a}, ${b}, ${c}, ${d})`
