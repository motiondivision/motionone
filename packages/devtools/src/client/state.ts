import { AnimationOptions, ValueKeyframe } from "@motionone/types"
import create from "zustand"
import { UseBoundStore, StoreApi } from "zustand"
import { AnimationMetadata, AnimationsMetadata } from "../types"
import { getElementId } from "./element-id"

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
    options: AnimationOptions
  ): void
}

export type ClientStore = UseBoundStore<ClientState, StoreApi<ClientState>>

export const store = create<ClientState>((set, get) => ({
  inspectedAnimation: undefined,
  isRecording: false,
  recordedAnimationCount: 0,
  recordedAnimations: undefined,
  startRecording: () => {
    set({
      isRecording: true,
      recordedAnimations: undefined,
      recordedAnimationCount: 1,
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
  recordAnimation: (element, valueName, keyframes, options) => {
    const {
      isRecording,
      recordedAnimationCount,
      recordedAnimations = {},
    } = get()

    if (!isRecording) return
    console.log(isRecording, options)
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
      elementId,
      animationName,
      valueName,
      keyframes,
      options,
    })

    set({
      recordedAnimations: newRecordedAnimations,
    })
  },
}))

const createAnimationMetadata = (): AnimationMetadata => ({
  elements: {},
  currentTime: 0,
})
