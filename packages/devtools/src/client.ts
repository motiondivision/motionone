import type { DevTools, AnimationOptions } from "@motionone/types"
import type { ValueKeyframesDefinition } from "@motionone/dom"
import { AnimationStartMessage, MotionMessage } from "./types"

let elementCounter = 0
function generateElementId(element: HTMLElement) {
  let id = element.dataset.motionId || element.id

  if (!id) {
    elementCounter++
    id = element.tagName.toLowerCase() + " " + elementCounter
    element.dataset.motionId = id
  }

  return id
}

function createDevToolsClient(): DevTools {
  const client: DevTools = {
    isRecording: false,
    record: (
      element: HTMLElement,
      valueName: string,
      keyframes: ValueKeyframesDefinition,
      options: AnimationOptions
    ) => {
      if (!client.isRecording) return

      const message: AnimationStartMessage = {
        type: "animationstart",
        elementId: generateElementId(element),
        valueName,
        keyframes,
        options,
      }

      window.postMessage(message, "*")
    },
  }

  function startRecording() {
    client.isRecording = true
  }

  function stopRecording() {
    client.isRecording = false
  }

  window.addEventListener("message", (event: MessageEvent<MotionMessage>) => {
    if (event.source !== window) return

    if (event.data.type === "isrecording") {
      event.data.isRecording ? startRecording() : stopRecording()
    }
  })

  return client
}

if (!(window as any).__MOTION_DEV_TOOLS) {
  ;(window as any).__MOTION_DEV_TOOLS = createDevToolsClient()
}
