import { AnimationOptions, ValueKeyframe } from "@motionone/types"
import create from "zustand"
import { UseBoundStore, StoreApi } from "zustand"
import { subscribeWithSelector } from "zustand/middleware"
import { AnimationMetadata, AnimationsMetadata, Source } from "../types"
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

      newRecordedAnimations[animationName].elements[elementId].push({
        id: uuid(),
        elementId,
        animationName,
        valueName,
        keyframes,
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
