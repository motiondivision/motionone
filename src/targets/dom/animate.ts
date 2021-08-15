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
import { resolveOption } from "../../utils/stagger"

export function animate(
  elements: AcceptedElements,
  keyframes: MotionKeyframesDefinition,
  options: AnimationListOptions = {}
): AnimationControls {
  elements = resolveElements(elements)

  const animations: AnimationWithCommitStyles[] = []
  const numElements = elements.length
  for (let i = 0; i < numElements; i++) {
    const element = elements[i]

    for (const key in keyframes) {
      const valueOptions = getOptions(options, key)
      valueOptions.delay = resolveOption(valueOptions.delay, i, numElements)

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
