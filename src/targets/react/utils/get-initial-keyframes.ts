import { MotionKeyframes } from "../../dom/types"
import { MotionCSSProperties } from "../types"

export function getInitialKeyframes(
  keyframes?: MotionKeyframes
): MotionCSSProperties | void {
  if (!keyframes) return

  const initialKeyframes: MotionCSSProperties = {}
  for (const key in keyframes) {
    const value = keyframes[key]
    initialKeyframes[key] = Array.isArray(value) ? value[0] : value
  }

  return initialKeyframes
}
