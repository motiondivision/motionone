import {
  AcceptedElements,
  AnimationControls,
  AnimationFactory,
  AnimationListOptions,
  MotionKeyframesDefinition,
} from "./types"
import { animateStyle } from "./animate-style"
import { getOptions } from "./utils/options"
import { resolveElements } from "./utils/resolve-elements"
import { createAnimations } from "./utils/controls"
import { resolveOption } from "../utils/stagger"
import { defaults } from "./utils/defaults"

export function animate(
  elements: AcceptedElements,
  keyframes: MotionKeyframesDefinition,
  options: AnimationListOptions = {}
): AnimationControls {
  elements = resolveElements(elements)
  const numElements = elements.length

  /**
   * Create and start new animations
   */
  const animationFactories: AnimationFactory[] = []
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

      animationFactories.push(animation)
    }
  }

  return createAnimations(
    animationFactories,
    /**
     * TODO:
     * If easing is set to spring or glide, duration will be dynamically
     * generated. Ideally we would dynamically generate this from
     * animation.effect.getComputedTiming().duration but this isn't
     * supported in iOS13 or our number polyfill. Perhaps it's possible
     * to Proxy animations returned from animateStyle that has duration
     * as a getter.
     */
    options.duration ?? defaults.duration
  )
}
