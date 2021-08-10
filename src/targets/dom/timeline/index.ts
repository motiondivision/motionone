import { controls } from "../animate"
import { animateStyle } from "../animate-style"
import { AnimationControls, AnimationWithCommitStyles } from "../types"
import { defaults } from "../utils/defaults"
import { getOptions } from "../utils/options"
import { resolveElements } from "../utils/resolve-elements"
import { TimelineDefinition } from "./types"
import { calcNextTime } from "./utils/calc-time"

interface ElementSequence {
  [key: string]: ValueSequence
}

type AbsoluteKeyframe = [string | number, number]

type ValueSequence = AbsoluteKeyframe[]

export function timeline(...definition: TimelineDefinition) {
  const animations: AnimationWithCommitStyles[] = []
  const elementSequences = new Map<Element, ElementSequence>()
  const timeLabels = new Map<string, number>()
  let currentTime = 0
  let totalDuration = 0

  // Build the timeline
  for (let i = 0; i < definition.length; i++) {
    const [elementDefinition, keyframes, options = {}, nextTime] = definition[i]

    if (nextTime) {
      currentTime = calcNextTime(currentTime, nextTime, timeLabels)
    }

    let maxDuration = 0

    // TODO: This code has a lot in common with animate
    // TODO: This can be safely cached within the timeline definition
    const elements = resolveElements(elementDefinition)
    for (
      let elementsIndex = 0;
      elementsIndex < elements.length;
      elementsIndex++
    ) {
      const element = elements[i]
      const elementSequence = getElementSequence(element, elementSequences)

      for (const key in keyframes) {
        const valueOptions = getOptions(options, key)
        const valueSequence = getValueSequence(key, elementSequence)
        const duration = valueOptions.duration ?? defaults.duration
        const targetTime = currentTime + duration

        /**
         * TODO:
         *  - If this is a single target, we want to set null at 0 and target at 1
         *  - If this is a simple array syntax we probably want to map 0-1 offsets throughout
         * the range between currentTime and targetTime
         * -  Get easing from valueOptions
         */
        valueSequence.push([keyframes[key]! as string, targetTime])

        maxDuration = Math.max(duration, maxDuration)
        totalDuration = Math.max(targetTime, totalDuration)
      }
    }

    currentTime += maxDuration
  }

  // Loop over all element timelines and all values
  // Create animations and offsets based on value @ times
  elementSequences.forEach((sequence, element) => {
    for (const key in sequence) {
      const valueSequence = sequence[key]
      valueSequence.sort(compareByTime)
      const keyframes = []
      const offsets = []
      // TODO: Loop backwards through keyframes - if encounter null,
      // take next (previous) value, or leave as null if at index 0
      // Then support null in animateStyle
      for (let i = 0; i < valueSequence.length; i++) {
        const [value, absoluteOffset] = valueSequence[i]
        keyframes.push(value)
        offsets.push(absoluteOffset)
        // TODO Get easing
        const animation = animateStyle(
          element,
          key,
          keyframes
          // valueOptions
        )
        animation && animations.push(animation as any)
      }
    }
  })

  // TODO Duplication with animate
  const state = {
    animations,
    finished: Promise.all(animations.map((animation) => animation.finished)),
  } as any
  return new Proxy(state, controls) as AnimationControls
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

const compareByTime = (a: AbsoluteKeyframe, b: AbsoluteKeyframe): number =>
  a[1] - b[1]
