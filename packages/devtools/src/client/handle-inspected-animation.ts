import { BasicAnimationControls } from "@motionone/types"
import { animateStyle } from "@motionone/dom"
import { AnimationMetadata } from "../types"
import { ClientState, store } from "./state"

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
          repeat:
            (options as any).repeat === "Infinity" ? Infinity : options.repeat,
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
    (state: ClientState) => state.inspectedAnimation,
    (
      inspectedAnimation: AnimationMetadata | undefined,
      prevInspectedAnimation: AnimationMetadata | undefined
    ) => {
      cancelAllAnimations()

      if (prevInspectedAnimation && inspectedAnimation) {
        createAnimations(inspectedAnimation)
      }
    }
  )

  store.subscribe(
    (state: ClientState) => state.inspectedAnimation?.currentTime,
    (currentTime: number | undefined) => {
      if (currentTime === undefined) return
      scrubTo(currentTime)
    }
  )

  store.subscribe(
    (state: ClientState) => state.isRecording,
    (isRecording: boolean) => {
      isRecording && cancelAllAnimations()
    }
  )
}
