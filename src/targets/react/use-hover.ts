import { HTMLProps } from "react"
import { MotionKeyframes } from "../dom/types"
import { AnimatedProps } from "./types"
import { useGestureState } from "./use-gesture-state"

export function useHover(
  target: MotionKeyframes,
  stylesToApply?: MotionKeyframes,
  { onPointerEnter, onPointerLeave }: AnimatedProps & HTMLProps<any> = {}
): HTMLProps<any> {
  const [, setGestureState] = useGestureState(target, stylesToApply)

  return stylesToApply
    ? {
        onPointerEnter: (e) => {
          onPointerEnter?.(e)
          setGestureState(true)
        },
        onPointerLeave: (e) => {
          onPointerLeave?.(e)
          setGestureState(false)
        },
      }
    : {}
}
