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

export function useHover(
  target: MotionKeyframes,
  options: AnimationOptionsWithOverrides,
  {
    hover,
    onPointerEnter,
    onPointerLeave,
    poses,
  }: AnimatedProps & HTMLProps<any> = {},
  { hover: inheritedHover }: AnimationContextProps,
  isPoseActive: PoseActiveState
): HTMLProps<any> {
  const [isHoverActive, setHoverState] = useGestureState(
    target,
    options,
    hover,
    inheritedHover,
    poses
  )

  isPoseActive.hover = isHoverActive

  return hover
    ? {
        onPointerEnter: (e) => {
          onPointerEnter?.(e)
          setHoverState(true)
        },
        onPointerLeave: (e) => {
          onPointerLeave?.(e)
          setHoverState(false)
        },
      }
    : {}
}
