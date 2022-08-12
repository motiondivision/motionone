import { UnresolvedValueKeyframe } from "@motionone/types"
import { isString, noopReturn } from "@motionone/utils"
import { CssPropertyDefinition } from "../types"

export function getUnitConverter(
  keyframes: UnresolvedValueKeyframe[],
  definition?: CssPropertyDefinition
) {
  let toUnit = definition?.toDefaultUnit || noopReturn
  const finalKeyframe = keyframes[keyframes.length - 1]
  if (isString(finalKeyframe)) {
    const unit = finalKeyframe.match(/(-?[\d.]+)([a-z%]*)/)?.[2] || ""
    if (unit) toUnit = (value: number) => value + unit
  }

  return toUnit
}
