import { ValueKeyframesDefinition } from "@motionone/dom"
import { AnimationOptions } from "@motionone/types"

export interface AnimationStartMessage {
  type: "animationstart"
  elementId: string
  valueName: string
  keyframes: ValueKeyframesDefinition
  options: AnimationOptions
}

export interface IsRecordingMessage {
  type: "isrecording"
  isRecording: boolean
}

export type MotionMessage = AnimationStartMessage | IsRecordingMessage
