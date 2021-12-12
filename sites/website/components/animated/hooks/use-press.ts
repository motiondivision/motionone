import type { HTMLProps } from "react"
import type {
  AnimationOptionsWithOverrides,
  MotionKeyframes,
} from "@motionone/dom"
import type {
  AnimatedProps,
  AnimationContextProps,
  PoseActiveState,
} from "../types"
import { useGestureState } from "./use-gesture-state"

export function usePress(
  target: MotionKeyframes,
  options: AnimationOptionsWithOverrides,
  { press, onPointerDown, poses }: AnimatedProps & HTMLProps<any> = {},
  { press: inheritedPress }: AnimationContextProps,
  isPoseActive: PoseActiveState
): HTMLProps<any> {
  const [isPressActive, setPressState] = useGestureState(
    target,
    options,
    press,
    inheritedPress,
    poses
  )
  isPoseActive.press = isPressActive

  if (!press) return {}

  const onPointerUp = () => {
    setPressState(false)
    window.removeEventListener("pointerup", onPointerUp)
  }

  return {
    onPointerDown: (e) => {
      onPointerDown?.(e)
      setPressState(true)
      window.addEventListener("pointerup", onPointerUp)
    },
  }
}
