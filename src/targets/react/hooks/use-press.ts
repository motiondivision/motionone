import { HTMLProps } from "react"
import { MotionKeyframes } from "../../dom/types"
import {
  AnimatedProps,
  AnimationContextProps,
  VariantActiveState,
} from "../types"
import { useGestureState } from "./use-gesture-state"

export function usePress(
  target: MotionKeyframes,
  { press, onPointerDown, variants }: AnimatedProps & HTMLProps<any> = {},
  { press: inheritedPress }: AnimationContextProps,
  isVariantActive: VariantActiveState
): HTMLProps<any> {
  const [isPressActive, setPressState] = useGestureState(
    target,
    press,
    inheritedPress,
    variants
  )
  isVariantActive.press = isPressActive

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
