import {
  AcceptedElements,
  AnimationControls,
  AnimationListOptions,
  AnimationWithCommitStyles,
  MotionKeyframesDefinition,
} from "./types"
import { animateStyle } from "./animate-style"
import { getOptions } from "./utils/options"
import { resolveElements } from "./utils/resolve-elements"
import { createAnimationControls } from "./utils/controls"

export function animate(
  elements: AcceptedElements,
  keyframes: MotionKeyframesDefinition,
  { stagger = 0, ...options }: AnimationListOptions = {}
): AnimationControls {
  elements = resolveElements(elements)

  const animations: AnimationWithCommitStyles[] = []
  for (let i = 0; i < elements.length; i++) {
    const element = elements[i]

    for (const key in keyframes) {
      const valueOptions = getOptions(options, key)
      if (stagger) {
        valueOptions.delay ||= 0
        valueOptions.delay += stagger * i
      }

      const animation = animateStyle(
        element,
        key,
        keyframes[key]!,
        valueOptions
      )

      animation && animations.push(animation as any)
    }
  }

  return createAnimationControls(animations)
}
