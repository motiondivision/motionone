import { progress } from "popmotion"
import { defaultOffset, fillOffset } from "../../js/utils/offset"
import { animateStyle } from "../animate-style"
import {
  AnimationOptions,
  AnimationWithCommitStyles,
  Easing,
  ValueKeyframesDefinition,
} from "../types"
import { createAnimationControls } from "../utils/controls"
import { defaults } from "../utils/defaults"
import { keyframesList } from "../utils/keyframes"
import { getOptions } from "../utils/options"
import { resolveElements } from "../utils/resolve-elements"
import { ElementSequence, TimelineDefinition, ValueSequence } from "./types"
import { calcNextTime } from "./utils/calc-time"
import { addKeyframes } from "./utils/edit"
import { compareByTime } from "./utils/sort"

type AnimateStyleDefinition = [
  Element,
  string,
  ValueKeyframesDefinition,
  AnimationOptions
]

export function timeline(...definition: TimelineDefinition) {
  const animations: AnimationWithCommitStyles[] = []

  const animationDefinitions = createAnimationsFromTimeline(definition)
  for (let i = 0; i < animationDefinitions.length; i++) {
    const animation = animateStyle(...animationDefinitions[i])
    animation && animations.push(animation as any)
  }

  return createAnimationControls(animations)
}

export function createAnimationsFromTimeline(
  definition: TimelineDefinition
): AnimateStyleDefinition[] {
  const animationDefinitions: AnimateStyleDefinition[] = []
  const elementSequences = new Map<Element, ElementSequence>()
  const elementCache = {}
  const timeLabels = new Map<string, number>()

  let currentTime = 0
  let totalDuration = 0

  /**
   * Build the timeline by mapping over the definition array and converting
   * the definitions into keyframes and offsets with absolute time values.
   * These will later get converted into relative offsets in a second pass.
   */
  for (let i = 0; i < definition.length; i++) {
    const [elementDefinition, keyframes, options = {}, nextTime] = definition[i]

    /**
     * If a relative or absolute time value has been specified we need to resolve
     * it in relation to the currentTime.
     */
    if (nextTime !== undefined) {
      currentTime = calcNextTime(currentTime, nextTime, timeLabels)
    }

    /**
     * Keep track of the maximum duration in this definition. This will be
     * applied to currentTime once the definition has been parsed.
     */
    let maxDuration = 0

    /**
     * Find all the elements specified in the definition and parse value
     * keyframes from their timeline definitions.
     *
     * TODO:
     *  - This code has a lot in common with animate, can it be DRYer to
     *    save on size? Perhaps computationally more expensive but overall
     *    cheaper, it could be possible for animate to call timeline simply as:
     *    timeline([elementDefinition, keyframes, options])
     *    Though this would increase minimum bundlesize.
     */
    const elements = resolveElements(elementDefinition, elementCache)
    for (
      let elementsIndex = 0;
      elementsIndex < elements.length;
      elementsIndex++
    ) {
      const element = elements[elementsIndex]
      const elementSequence = getElementSequence(element, elementSequences)

      for (const key in keyframes) {
        const valueSequence = getValueSequence(key, elementSequence)
        const valueKeyframes = keyframesList(keyframes[key]!)
        const valueOptions = getOptions(options, key)
        const {
          duration = defaults.duration,
          easing = defaults.easing,
          offset = defaultOffset(valueKeyframes.length),
        } = valueOptions
        const targetTime = currentTime + duration

        /**
         * Fill out if offset if fewer offsets than keyframes
         */
        const remainder = length - valueKeyframes.length
        remainder > 0 && fillOffset(offset, remainder)

        /**
         * If only one value has been set, ie [1], push a null to the start of
         * the keyframe array. This will let us mark a keyframe at this point
         * that will later be hydrated with the previous value.
         */
        valueKeyframes.length === 1 && valueKeyframes.unshift(null)

        /**
         * Add keyframes, mapping offsets to absolute time.
         */
        addKeyframes(
          valueSequence,
          valueKeyframes,
          easing,
          offset,
          currentTime,
          targetTime
        )

        maxDuration = Math.max(duration, maxDuration)
        totalDuration = Math.max(targetTime, totalDuration)
      }
    }

    currentTime += maxDuration
  }

  // Loop over all element timelines and all values
  // Create animations and offsets based on value @ times
  elementSequences.forEach((valueSequences, element) => {
    for (const key in valueSequences) {
      const valueSequence = valueSequences[key]
      valueSequence.sort(compareByTime)
      const keyframes = []
      const options = {
        offset: [] as number[],
        easing: [] as Easing[],
      }

      for (let i = 0; i < valueSequence.length; i++) {
        const { at, value, easing } = valueSequence[i]
        keyframes.push(value)
        options.offset.push(progress(0, totalDuration, at))
        options.easing.push(easing || defaults.easing)

        animationDefinitions.push([element, key, keyframes, options])
      }
    }
  })

  return animationDefinitions
}

function getElementSequence(
  element: Element,
  sequences: Map<Element, ElementSequence>
): ElementSequence {
  !sequences.has(element) && sequences.set(element, {})
  return sequences.get(element)!
}

function getValueSequence(
  name: string,
  sequences: ElementSequence
): ValueSequence {
  if (!sequences[name]) sequences[name] = []
  return sequences[name]
}
