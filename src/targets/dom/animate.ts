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
import { defaults } from "./utils/defaults"
import { stopElementAnimation } from "./utils/stop-animation"

export function animate(
  elements: AcceptedElements,
  keyframes: MotionKeyframesDefinition,
  options: AnimationListOptions = {}
): AnimationControls {
  elements = resolveElements(elements)
  const numElements = elements.length

  /**
   * Stop existing animations of all elements in batch before starting
   * new ones. This will reduce layout thrashing if new animations
   * need to read current styles.
   */
  for (let i = 0; i < numElements; i++) {
    for (const key in keyframes) stopElementAnimation(elements[i], key)
  }

  /**
   * Create and start new animations
   */
  const animations: AnimationWithCommitStyles[] = []
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

  return createAnimationControls(
    animations,
    // TODO: Remove this in case duration is dynamically generated
    options.duration ?? defaults.duration
  )
}
