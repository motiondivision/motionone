import {
  AnimationOptions,
  Easing,
  EasingGenerator,
  ValueKeyframe,
} from "@motionone/types"
import {
  defaultOffset,
  defaults,
  fillOffset,
  isEasingGenerator,
  isEasingList,
} from "@motionone/utils"
import create from "zustand"
import { UseBoundStore, StoreApi } from "zustand"
import { subscribeWithSelector } from "zustand/middleware"
import {
  AnimationMetadata,
  AnimationsMetadata,
  Source,
  Keyframe,
} from "../types"
import { getElementId } from "./element-id"
import { uuid } from "./utils/uuid"

export interface ClientState {
  inspectedAnimation: AnimationMetadata | undefined
  isRecording: boolean
  startRecording(): void
  stopRecording(): void
  recordedAnimationCount: number
  recordedAnimations: AnimationsMetadata | undefined
  flushRecordedAnimations(): void
  scrubTo(time: number): void
  inspectAnimation(animation: AnimationMetadata): void
  recordAnimation(
    element: HTMLElement,
    valueName: string,
    keyframes: ValueKeyframe[],
    options: AnimationOptions,
    source: Source
  ): void
}

export type ClientStore = UseBoundStore<ClientState, StoreApi<ClientState>>

export const store = create<ClientState>(
  subscribeWithSelector((set, get) => ({
    inspectedAnimation: undefined,
    isRecording: false,
    recordedAnimationCount: 0,
    recordedAnimations: undefined,
    startRecording: () => {
      set({
        isRecording: true,
        recordedAnimations: undefined,
        recordedAnimationCount: 1,
        inspectedAnimation: undefined,
      })
    },
    stopRecording: () => set({ isRecording: false }),
    flushRecordedAnimations: () => {
      set({
        recordedAnimations: undefined,
        recordedAnimationCount: get().recordedAnimationCount + 1,
      })
    },
    inspectAnimation: (inspectedAnimation) => set({ inspectedAnimation }),
    scrubTo: (currentTime) => {
      const existingAnimation = get().inspectedAnimation
      if (existingAnimation) {
        set({ inspectedAnimation: { ...existingAnimation, currentTime } })
      }
    },
    recordAnimation: (element, valueName, keyframes, options, source) => {
      const {
        isRecording,
        recordedAnimationCount,
        recordedAnimations = {},
      } = get()

      if (!isRecording) return

      // TODO: Replace animation name with options.name if present
      const animationName = `Animation ${recordedAnimationCount}`
      const elementId = getElementId(element)

      // TODO: This section probably doesn't need to be immutible
      const newRecordedAnimations = { ...recordedAnimations }

      newRecordedAnimations[animationName] = {
        ...(newRecordedAnimations[animationName] || createAnimationMetadata()),
      }

      newRecordedAnimations[animationName].elements[elementId] = [
        ...(newRecordedAnimations[animationName].elements[elementId] || []),
      ]

      const offsets = [...(options.offset || defaultOffset(keyframes.length))]
      const remainder = length - offsets.length
      remainder > 0 && fillOffset(offsets, remainder)

      newRecordedAnimations[animationName].elements[elementId].push({
        id: uuid(),
        elementId,
        animationName,
        valueName,
        keyframes: keyframes.reduce((acc, keyframe, index) => {
          const id = uuid()
          const data: Keyframe = {
            id,
            value: keyframe as string,
            easing: getKeyframeEasing(options.easing, index),
            offset: offsets[index],
          }

          acc[id] = data

          return acc
        }, {}),
        options,
        source,
      })

      set({
        recordedAnimations: newRecordedAnimations,
      })
    },
  }))
) as any

const createAnimationMetadata = (): AnimationMetadata => ({
  elements: {},
  currentTime: 0,
})

function getKeyframeEasing(
  easing: EasingGenerator | Easing | Easing[] | undefined,
  index: number
): Easing {
  /**
   * Don't display easing for first keyframe or accept easing generator
   * TODO: Remove this check as to support easing generators we'll be receiving this as a
   * serialised object of some kind.
   */
  if (!easing || !index || isEasingGenerator(easing)) return defaults.easing

  const easingDefinition = isEasingList(easing) ? easing[index - 1] : easing

  /**
   * Leva is mutatative of the initial value, so if this is a bezier definition, copy.
   */
  return Array.isArray(easingDefinition)
    ? [...easingDefinition]
    : easingDefinition
}
