import { BezierDefinition, CustomEasing, Easing } from "../types"

export const isCubicBezier = (
  easing: Easing | Easing[]
): easing is BezierDefinition =>
  Array.isArray(easing) && typeof easing[0] === "number"

export const isEasingList = (easing: Easing | Easing[]): easing is Easing[] =>
  Array.isArray(easing) && typeof easing[0] !== "number"

export const isCustomEasing = (
  easing: Easing | Easing[] | CustomEasing
): easing is CustomEasing =>
  typeof easing === "object" && (easing as CustomEasing).isCustomEasing

export const convertEasing = (easing: Easing) =>
  isCubicBezier(easing) ? cubicBezierAsString(easing) : easing

export const cubicBezierAsString = ([a, b, c, d]: BezierDefinition) =>
  `cubic-bezier(${a}, ${b}, ${c}, ${d})`
