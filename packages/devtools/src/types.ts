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
  [key: string]: ValueAnimationMetadata[]
}

export interface AnimationsMetadata {
  [key: string]: AnimationMetadata
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

export type MotionMessage =
  | AnimationStartMessage
  | IsRecordingMessage
  | DevToolsInitMessage
  | LoginMessage
  | ClearAnimationsMessage
  | ClientReadyMessage

export type EditorAuth = {
  isPro: boolean
  username?: string
}
