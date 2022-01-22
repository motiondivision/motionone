import { BezierDefinition, Easing, EasingGenerator } from "@motionone/types"

export const isNumber = (value: unknown): value is number =>
  typeof value === "number"

export const isString = (value: unknown): value is string =>
  typeof value === "string"

export const isEasingGenerator = (
  easing: Easing | Easing[] | EasingGenerator
): easing is EasingGenerator =>
  typeof easing === "object" &&
  Boolean((easing as EasingGenerator).createAnimation)

export const isCubicBezier = (
  easing: Easing | Easing[]
): easing is BezierDefinition => Array.isArray(easing) && isNumber(easing[0])

export const isEasingList = (easing: Easing | Easing[]): easing is Easing[] =>
  Array.isArray(easing) && !isNumber(easing[0])
