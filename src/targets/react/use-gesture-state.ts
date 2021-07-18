import { useState } from "react"
import { MotionKeyframes } from "../dom/types"

export function useGestureState(
  target: MotionKeyframes,
  stylesToApply?: MotionKeyframes
) {
  const [isGestureActive, setGestureState] = useState(false)
  if (isGestureActive) Object.assign(target, stylesToApply)
  return setGestureState
}
