import { HTMLProps } from "react"
import { AnimatedProps } from "./types"
import { useGestureState } from "./use-gesture-state"

export function useHover(
  target: React.CSSProperties,
  stylesToApply?: React.CSSProperties,
  { onPointerEnter, onPointerLeave }: AnimatedProps & HTMLProps<any> = {}
): HTMLProps<any> {
  const setGestureState = useGestureState(target, stylesToApply)
  if (!stylesToApply) return {}

  return {
    onPointerEnter: (e) => {
      onPointerEnter?.(e)
      setGestureState(true)
    },
    onPointerLeave: (e) => {
      onPointerLeave?.(e)
      setGestureState(false)
    },
  }
}
