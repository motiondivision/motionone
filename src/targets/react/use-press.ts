import { HTMLProps } from "react"
import { AnimatedProps } from "./types"
import { useGestureState } from "./use-gesture-state"

export function usePress(
  target: React.CSSProperties,
  stylesToApply?: React.CSSProperties,
  { onPointerDown }: AnimatedProps & HTMLProps<any> = {}
): HTMLProps<any> {
  const setGestureState = useGestureState(target, stylesToApply)
  if (!stylesToApply) return {}

  const onPointerUp = () => {
    setGestureState(false)
    window.removeEventListener("pointerup", onPointerUp)
  }

  return {
    onPointerDown: (e) => {
      onPointerDown?.(e)
      setGestureState(true)
      window.addEventListener("pointerup", onPointerUp)
    },
  }
}
