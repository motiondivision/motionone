import { cubicBezier, linear, steps } from "popmotion"
import { Easing } from "../targets/dom/types"

type EasingFunction = (v: number) => number

export function getEasingFunction(definition: Easing): EasingFunction {
  if (Array.isArray(definition)) {
    return cubicBezier(...definition)
  } else if (definition.startsWith("steps")) {
    return steps(1, "end")
  } else {
    return linear
  }
}
