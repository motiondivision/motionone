import { HTMLProps } from "react"
import { MotionKeyframes } from "../../dom/types"
import {
  AnimatedProps,
  AnimationContextProps,
  VariantActiveState,
} from "../types"
import { useGestureState } from "./use-gesture-state"

export function useHover(
  target: MotionKeyframes,
  {
    hover,
    onPointerEnter,
    onPointerLeave,
    variants,
  }: AnimatedProps & HTMLProps<any> = {},
  { hover: inheritedHover }: AnimationContextProps,
  isVariantActive: VariantActiveState
): HTMLProps<any> {
  const [isHoverActive, setHoverState] = useGestureState(
    target,
    hover,
    inheritedHover,
    variants
  )

  isVariantActive.hover = isHoverActive

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
