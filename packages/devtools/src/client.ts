import type { DevTools, AnimationOptions } from "@motionone/types"
import type { ValueKeyframesDefinition } from "@motionone/dom"
import {
  AnimationStartMessage,
  MotionMessage,
  AnimationsMetadata,
} from "./types"

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

let animations: AnimationsMetadata = {}
let animationCount = 1
let isFlushScheduled = false

function flushBuffer() {
  const message: AnimationStartMessage = {
    type: "animationstart",
    animations: animations,
  }

  window.postMessage(message, "*")

  isFlushScheduled = false
  animations = {}
  animationCount++
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

      const animationName = `Animation ${animationCount}`
      const elementId = generateElementId(element)

      if (!animations[animationName]) {
        animations[animationName] = {}
      }

      if (!animations[animationName][elementId]) {
        animations[animationName][elementId] = []
      }

      animations[animationName][elementId].push({
        elementId,
        animationName,
        valueName,
        keyframes,
        options,
      })

      if (!isFlushScheduled) {
        isFlushScheduled = true
        requestAnimationFrame(flushBuffer)
      }
    },
  }

  function startRecording() {
    animationCount = 1
    animations = {}
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
