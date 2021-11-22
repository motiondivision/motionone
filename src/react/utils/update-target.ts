import type {
  AnimationOptionsWithOverrides,
  MotionKeyframes,
} from "../../dom/types"
import type { MotionKeyframesWithOptions } from "../types"
import { getOptions } from "../../dom/utils/options"

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
