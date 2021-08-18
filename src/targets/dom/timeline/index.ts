import { progress } from "popmotion"
import { resolveOption } from "../../../utils/stagger"
import { defaultOffset, fillOffset } from "../../js/utils/offset"
import { animateStyle } from "../animate-style"
import {
  AnimationOptions,
  AnimationOptionsWithOverrides,
  AnimationWithCommitStyles,
  Easing,
  PlaybackOptions,
  UnresolvedValueKeyframe,
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

export type TimelineOptions = PlaybackOptions & {
  duration?: number
  defaultOptions?: AnimationOptionsWithOverrides
}

export function timeline(
  definition: TimelineDefinition,
  options: TimelineOptions = {}
) {
  const animations: AnimationWithCommitStyles[] = []

  const animationDefinitions = createAnimationsFromTimeline(definition, options)
  for (let i = 0; i < animationDefinitions.length; i++) {
    const animation = animateStyle(...animationDefinitions[i])
    animation && animations.push(animation as any)
  }

  return createAnimationControls(animations)
}

export function createAnimationsFromTimeline(
  definition: TimelineDefinition,
  { defaultOptions = {}, ...timelineOptions }: TimelineOptions = {}
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
    const [elementDefinition, keyframes, options = {}] = definition[i]

    /**
     * If a relative or absolute time value has been specified we need to resolve
     * it in relation to the currentTime.
     */
    if (options.at !== undefined) {
      currentTime = calcNextTime(currentTime, options.at, timeLabels)
    }

    /**
     * Keep track of the maximum duration in this definition. This will be
     * applied to currentTime once the definition has been parsed.
     */
    let maxDuration = 0

    /**
     * Find all the elements specified in the definition and parse value
     * keyframes from their timeline definitions.
     */
    const elements = resolveElements(elementDefinition, elementCache)
    const numElements = elements.length
    for (let elementIndex = 0; elementIndex < numElements; elementIndex++) {
      const element = elements[elementIndex]
      const elementSequence = getElementSequence(element, elementSequences)

      for (const key in keyframes) {
        const valueSequence = getValueSequence(key, elementSequence)
        const valueKeyframes = keyframesList(keyframes[key]!)
        const valueOptions = getOptions(options, key)
        const {
          duration = defaultOptions.duration || defaults.duration,
          easing = defaultOptions.easing || defaults.easing,
          offset = defaultOffset(valueKeyframes.length),
        } = valueOptions

        const delay =
          resolveOption(options.delay, elementIndex, numElements) || 0
        const startTime = currentTime + delay
        const targetTime = startTime + duration

        if (offset.length === 1 && offset[0] === 0) {
          offset[1] = 1
        }

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
          startTime,
          targetTime
        )

        maxDuration = Math.max(delay + duration, maxDuration)
        totalDuration = Math.max(targetTime, totalDuration)
      }
    }

    currentTime += maxDuration
  }

  /**
   * For every element and value combination create a new animation.
   */
  elementSequences.forEach((valueSequences, element) => {
    for (const key in valueSequences) {
      const valueSequence = valueSequences[key]

      /**
       * Arrange all the keyframes in ascending time order.
       */
      valueSequence.sort(compareByTime)

      const keyframes: UnresolvedValueKeyframe[] = []
      const valueOffset: number[] = []
      const valueEasing: Easing[] = []

      /**
       * For each keyframe, translate absolute times into
       * relative offsets based on the total duration of the timeline.
       */
      for (let i = 0; i < valueSequence.length; i++) {
        const { at, value, easing } = valueSequence[i]
        keyframes.push(value)
        valueOffset.push(progress(0, totalDuration, at))
        valueEasing.push(easing || defaults.easing)
      }

      /**
       * If the generated animation doesn't end on the final keyframe,
       * provide one with a null wildcard value. This will ensure it
       * stays static until the end of the animation.
       */
      if (valueOffset[valueOffset.length - 1] !== 1) {
        valueOffset.push(1)
        keyframes.push(null)
      }

      animationDefinitions.push([
        element,
        key,
        keyframes,
        {
          ...defaultOptions,
          duration: totalDuration,
          easing: valueEasing,
          offset: valueOffset,
          ...timelineOptions,
        },
      ])
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
