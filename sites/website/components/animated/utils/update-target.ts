import type {
  AnimationOptionsWithOverrides,
  MotionKeyframes,
} from "@motionone/dom"
import type { MotionKeyframesWithOptions } from "../types"
import { getOptions } from "./get-options"

export function updateTargetAndOptions(
  target: MotionKeyframes,
  options: AnimationOptionsWithOverrides,
  toApply?: MotionKeyframesWithOptions
) {
  if (!toApply) return

  for (const key in toApply) {
    if (key === "options") continue

    target[key] = toApply[key]
    if (toApply.options) {
      options[key] = getOptions(toApply.options, key)
    }
  }
}
