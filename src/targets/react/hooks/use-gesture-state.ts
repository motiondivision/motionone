import { Dispatch, SetStateAction, useState } from "react"
import { MotionKeyframes } from "../../dom/types"
import { Variants } from "../types"
import { resolveVariant } from "../utils/variants"

export function useGestureState(
  target: MotionKeyframes,
  stylesToApply?: MotionKeyframes | string,
  inheritedVariant?: string,
  variants?: Variants
): [boolean, Dispatch<SetStateAction<boolean>>] {
  const [isGestureActive, setGestureState] = useState(false)
  if (isGestureActive || inheritedVariant) {
    Object.assign(
      target,
      resolveVariant(stylesToApply, inheritedVariant, variants)
    )
  }
  return [isGestureActive || Boolean(inheritedVariant), setGestureState]
}
