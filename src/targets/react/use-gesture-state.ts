import { Dispatch, SetStateAction, useState } from "react"
import { MotionKeyframes } from "../dom/types"

export function useGestureState(
  target: MotionKeyframes,
  stylesToApply?: MotionKeyframes
): [boolean, Dispatch<SetStateAction<boolean>>] {
  const [isGestureActive, setGestureState] = useState(false)
  if (isGestureActive) Object.assign(target, stylesToApply)
  return [isGestureActive, setGestureState]
}
