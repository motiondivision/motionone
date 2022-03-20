import { AnimationOptions, ValueKeyframe } from "@motionone/types"
import create from "zustand"
import { UseBoundStore, StoreApi } from "zustand"
import { subscribeWithSelector } from "zustand/middleware"
import { AnimationMetadata, AnimationsMetadata, Source } from "../types"
import { getElementId } from "./element-id"

export interface ClientState {
  inspectedAnimation: AnimationMetadata | undefined
  isRecording: boolean
  startRecording(): void
  stopRecording(): void
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

const animationCounters = new Map<string, number>()
const animationNamesToFlush = new Set<string>()

export type ClientStore = UseBoundStore<ClientState, StoreApi<ClientState>>

export const store = create<ClientState>(
  subscribeWithSelector((set, get) => ({
    inspectedAnimation: undefined,
    isRecording: false,
    recordedAnimations: undefined,
    startRecording: () => {
      animationCounters.clear()
      animationNamesToFlush.clear()

      set({
        isRecording: true,
        recordedAnimations: undefined,
        inspectedAnimation: undefined,
      })
    },
    stopRecording: () => set({ isRecording: false }),
    flushRecordedAnimations: () => {
      animationNamesToFlush.clear()
      set({
        recordedAnimations: undefined,
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
      const { isRecording, recordedAnimations = {} } = get()

      if (!isRecording) return

      const name = options.name || "Animation"

      if (!animationNamesToFlush.has(name)) {
        animationNamesToFlush.add(name)
        animationCounters.set(name, (animationCounters.get(name) ?? 0) + 1)
      }

      // TODO: Replace animation name with options.name if present
      const count = animationCounters.get(name)
      const animationName = `${name} ${count === 1 ? "" : count}`.trim()
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
