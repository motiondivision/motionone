import {
  ElementOrSelector,
  animate as animateDom,
  AnimationOptionsWithOverrides,
  MotionKeyframesDefinition,
} from "@motionone/dom"
import { AnimationControls } from "@motionone/types"

export function animate(
  target: ElementOrSelector,
  keyframes: MotionKeyframesDefinition,
  options?: AnimationOptionsWithOverrides
): AnimationControls {
  return animateDom(target, keyframes, options)
}
