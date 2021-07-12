import { MotionKeyframe } from "../types"
import { cubicBezierAsString } from "./bezier-string"

export function getTargetKeyframe(
  keyframes: MotionKeyframe | MotionKeyframe[]
): MotionKeyframe {
  return Array.isArray(keyframes) ? keyframes[keyframes.length - 1] : keyframes
}

function replaceEaseArray(keyframe: MotionKeyframe): Keyframe {
  return Array.isArray(keyframe.easing)
    ? {
        ...keyframe,
        easing: cubicBezierAsString(keyframe.easing),
      }
    : (keyframe as Keyframe)
}

export function makeKeyframesAnimatable(
  keyframes: MotionKeyframe | MotionKeyframe[]
): Keyframe[] {
  return Array.isArray(keyframes)
    ? keyframes.map(replaceEaseArray)
    : [replaceEaseArray(keyframes)]
}
