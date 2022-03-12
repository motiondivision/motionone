import { MotionMessage } from "../types"
import { store } from "./state"

export function handleMessages() {
  window.addEventListener(
    "message",
    ({ source, data }: MessageEvent<MotionMessage>) => {
      if (source !== window) return

      const state = store.getState()

      switch (data.type) {
        case "isrecording": {
          data.isRecording ? state.startRecording() : state.stopRecording()
          break
        }
        case "scrubanimation": {
          console.log("client received scrubanimation")
          state.scrubTo(data.time)
          break
        }
        case "inspectanimation": {
          state.inspectAnimation(data.animation)
          break
        }
      }
    }
  )
}
