import { HTMLProps } from "react"
import { MotionKeyframes } from "../dom/types"
import { AnimatedProps } from "./types"
import { useGestureState } from "./use-gesture-state"

export function useHover(
  target: MotionKeyframes,
  stylesToApply?: MotionKeyframes | string,
  {
    onPointerEnter,
    onPointerLeave,
    variants,
  }: AnimatedProps & HTMLProps<any> = {}
): HTMLProps<any> {
  const [, setGestureState] = useGestureState(target, stylesToApply, variants)

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
