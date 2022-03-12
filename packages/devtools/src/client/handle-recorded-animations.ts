import { AnimationStartMessage } from "../types"
import { store } from "./state"

export function handleRecordedAnimations() {
  let scheduledFlush: number | undefined = undefined

  function flushAnimations() {
    scheduledFlush = undefined

    const { recordedAnimations, flushRecordedAnimations } = store.getState()

    if (!recordedAnimations) return

    const message: AnimationStartMessage = {
      type: "animationstart",
      animations: recordedAnimations,
    }

    window.postMessage(message, "*")

    flushRecordedAnimations()
  }

  /**
   * Handle newly recorded animations
   */
  store.subscribe(
    (recordedAnimations) => {
      if (!recordedAnimations) return

      if (scheduledFlush === undefined) {
        scheduledFlush = requestAnimationFrame(flushAnimations)
      }
    },
    (state) => state.recordedAnimations
  )
}
