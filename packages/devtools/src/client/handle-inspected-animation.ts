import { BasicAnimationControls } from "@motionone/types"
import { animateStyle } from "@motionone/dom"
import { AnimationMetadata } from "../types"
import { store } from "./state"

export function handleInspectedAnimation() {
  const animations: BasicAnimationControls[] = []

  function scrubTo(time: number) {
    for (const animation of animations) {
      animation.currentTime = time * 1000
    }
  }

  function createAnimations(animation: AnimationMetadata) {
    cancelAllAnimations()

    for (const elementId in animation.elements) {
      const element = document.querySelector(`[data-motion-id="${elementId}"]`)

      if (!element) continue

      for (const valueAnimation of animation.elements[elementId]) {
        const { valueName, keyframes, options } = valueAnimation
        const newAnimation = animateStyle(element, valueName, keyframes, {
          ...options,
          record: false,
        })()
        newAnimation?.pause()
        newAnimation && animations.push(newAnimation)
      }
    }

    scrubTo(animation.currentTime)
  }

  function cancelAllAnimations() {
    for (const animation of animations) animation.cancel()
    animations.length = 0
  }

  store.subscribe(
    (
      inspectedAnimation: AnimationMetadata | undefined,
      prevInspectedAnimation: AnimationMetadata | undefined
    ) => {
      cancelAllAnimations()

      if (prevInspectedAnimation && inspectedAnimation) {
        createAnimations(inspectedAnimation)
      }
    },
    (state) => state.inspectedAnimation
  )

  store.subscribe(
    (currentTime: number | undefined) => {
      if (currentTime === undefined) return
      scrubTo(currentTime)
    },
    (state) => state.inspectedAnimation?.currentTime
  )

  store.subscribe(
    (isRecording) => {
      isRecording && cancelAllAnimations()
    },
    (state) => state.isRecording
  )
}
