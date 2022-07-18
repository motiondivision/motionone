import type { BezierDefinition, Easing, EasingFunction } from "@motionone/types"
import { defaults, isCubicBezier, isFunction, progress } from "@motionone/utils"
import { supports } from "./feature-detection"

// Create a linear easing point for every x second
const resolution = 0.015

export const generateLinearEasingPoints = (
  easing: EasingFunction,
  duration: number
): string => {
  let points = ""
  const numPoints = Math.round(duration / resolution)

  for (let i = 0; i < numPoints; i++) {
    points += easing(progress(0, numPoints - 1, i)) + ", "
  }

  return points.substring(0, points.length - 2)
}

export const convertEasing = (
  easing: Easing | EasingFunction,
  duration: number
): string => {
  if (isFunction(easing)) {
    return supports.linearEasing()
      ? `linear(${generateLinearEasingPoints(easing, duration)})`
      : (defaults.easing as string)
  } else {
    return isCubicBezier(easing) ? cubicBezierAsString(easing) : easing
  }
}

export const cubicBezierAsString = ([a, b, c, d]: BezierDefinition) =>
  `cubic-bezier(${a}, ${b}, ${c}, ${d})`
