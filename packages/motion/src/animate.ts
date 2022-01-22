import {
  AcceptedElements,
  animate as animateDom,
  AnimationOptionsWithOverrides,
  MotionKeyframesDefinition,
  wrapAnimationWithControls,
} from "@motionone/dom"
import { Animation } from "@motionone/animation"
import {
  AnimationControls,
  AnimationOptions,
  ProgressFunction,
} from "@motionone/types"

export function animateProgress(
  target: ProgressFunction,
  options?: AnimationOptions
) {
  return wrapAnimationWithControls(
    [() => new Animation(target, [0, 1], options)],
    options?.duration
  )
}

export function animate(
  elements: AcceptedElements,
  keyframes: MotionKeyframesDefinition,
  options?: AnimationOptionsWithOverrides
): AnimationControls
export function animate(
  target: ProgressFunction,
  options?: AnimationOptions
): AnimationControls
export function animate(
  target: ProgressFunction | AcceptedElements,
  keyframesOrOptions?: MotionKeyframesDefinition | AnimationOptions,
  options?: AnimationOptionsWithOverrides
): AnimationControls {
  const animationFunction: any =
    typeof target === "function" ? animateProgress : animateDom

  return animationFunction(target, keyframesOrOptions, options)
}
