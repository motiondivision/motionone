import { AnimationOptions, ValueKeyframe } from "@motionone/types"

export interface Storage {
  recordingTabs: Set<number>
}

export interface ValueAnimationMetadata {
  elementId: string
  animationName: string
  valueName: string
  keyframes: ValueKeyframe[]
  options: AnimationOptions
}

export interface AnimationMetadata {
  currentTime: number
  elements: {
    [elementName: string]: ValueAnimationMetadata[]
  }
}

export interface AnimationsMetadata {
  [animationName: string]: AnimationMetadata
}

export interface AnimationStartMessage {
  type: "animationstart"
  animations: AnimationsMetadata
}

export interface IsRecordingMessage {
  type: "isrecording"
  isRecording: boolean
  tabId: number
}

export interface DevToolsInitMessage {
  type: "init"
  tabId: number
}

export interface LoginMessage {
  type: "login"
  isPro: boolean
  username: string
}

export interface ClearAnimationsMessage {
  type: "clear"
}

export interface ClientReadyMessage {
  type: "clientready"
}

export interface InspectAnimationMessage {
  type: "inspectanimation"
  animation: AnimationMetadata
  tabId: number
}

export interface ScrubAnimationMessage {
  type: "scrubanimation"
  time: number
  tabId: number
}

export interface TabIdMessage {
  type: "tabId"
  tabId: number
}

export type MotionMessage =
  | AnimationStartMessage
  | IsRecordingMessage
  | DevToolsInitMessage
  | LoginMessage
  | ClearAnimationsMessage
  | ClientReadyMessage
  | InspectAnimationMessage
  | ScrubAnimationMessage
  | TabIdMessage

export type EditorAuth = {
  isPro: boolean
  username?: string
}
