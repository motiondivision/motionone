import { HTMLProps } from "react"
import { AnimatedProps } from "./types"
import { useGestureState } from "./use-gesture-state"

export function usePress(
  target: React.CSSProperties,
  stylesToApply?: React.CSSProperties,
  { onPointerDown, onPointerUp }: AnimatedProps & HTMLProps<any> = {}
): HTMLProps<any> {
  const setGestureState = useGestureState(target, stylesToApply)
  if (!stylesToApply) return {}

  return {
    onPointerDown: (e) => {
      onPointerDown?.(e)
      setGestureState(true)
    },
    // TODO: This should add a listener to the window
    onPointerUp: (e) => {
      onPointerUp?.(e)
      setGestureState(false)
    },
  }
}
