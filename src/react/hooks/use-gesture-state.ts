import { Dispatch, SetStateAction, useState } from "react"
import { AnimationOptionsWithOverrides, MotionKeyframes } from "../../dom/types"
import { Poses } from "../types"
import { resolvePose } from "../utils/poses"
import { updateTargetAndOptions } from "../utils/update-target"

export function useGestureState(
  target: MotionKeyframes,
  options: AnimationOptionsWithOverrides,
  stylesToApply?: MotionKeyframes | string,
  inheritedPose?: string,
  poses?: Poses
): [boolean, Dispatch<SetStateAction<boolean>>] {
  const [isGestureActive, setGestureState] = useState(false)
  if (isGestureActive || inheritedPose) {
    updateTargetAndOptions(
      target,
      options,
      resolvePose(stylesToApply, inheritedPose, poses)
    )
  }
  return [isGestureActive || Boolean(inheritedPose), setGestureState]
}
