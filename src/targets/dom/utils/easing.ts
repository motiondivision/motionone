import { BezierDefinition, Easing } from "../types"

export const isCubicBezier = (
  easing: Easing | Easing[]
): easing is BezierDefinition =>
  Array.isArray(easing) && typeof easing[0] === "number"

export const isEasingList = (easing: Easing | Easing[]): easing is Easing[] =>
  Array.isArray(easing) && typeof easing[0] !== "number"

export const convertEasing = (easing: Easing) =>
  isCubicBezier(easing) ? cubicBezierAsString(easing) : easing

export const convertEasingList = (easing: Easing[]) => easing.map(convertEasing)

export const cubicBezierAsString = ([a, b, c, d]: BezierDefinition) =>
  `cubic-bezier(${a}, ${b}, ${c}, ${d})`
