import { AnimationMetadata, AnimationStartMessage } from "../types"
import { cssAnimation } from "./plugins/css-animation"
import { cssTransition } from "./plugins/css-transition"
import { motionOne } from "./plugins/motion-one"
import { ClientState, store } from "./state"

const plugins = [cssTransition, cssAnimation, motionOne]

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
    (state: ClientState) => state.recordedAnimations,
    (recordedAnimations: AnimationMetadata | undefined) => {
      if (!recordedAnimations) return

      if (scheduledFlush === undefined) {
        scheduledFlush = requestAnimationFrame(flushAnimations)
      }
    }
  )

  store.subscribe(
    ({ isRecording }: ClientState) => isRecording,
    (isRecording: boolean) => {
      plugins.forEach((plugin) => {
        isRecording ? plugin.onRecordStart() : plugin.onRecordEnd()
      })
    }
  )
}
