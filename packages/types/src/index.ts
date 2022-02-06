import { MotionValue } from "./MotionValue"

export { MotionValue } from "./MotionValue"

export interface AnimationGeneratorState {
  done: boolean
  hasReachedTarget: boolean
  current: number
  target: number
  velocity: number
}

export type ProgressFunction = (t: number) => void

export type AnimationGeneratorFactory<Options> = (
  options: Options
) => AnimationGenerator

export type AnimationGenerator = (t: number) => AnimationGeneratorState

export type BezierDefinition = [number, number, number, number]

export type PlayState = "idle" | "running" | "paused" | "finished"

export interface BasicAnimationControls {
  play: VoidFunction
  pause: VoidFunction
  commitStyles: VoidFunction
  cancel: VoidFunction
  playState: PlayState
  finished: Promise<any>
  startTime: number | null
  currentTime: number | null
}

export interface AnimationControls extends BasicAnimationControls {
  stop: VoidFunction
  finish: VoidFunction
  reverse: VoidFunction
  finished: Promise<any>
  duration: number
  playbackRate: number
}

export type CustomAnimationSettings = {
  easing: Easing
  keyframes?: number[]
  duration?: number
}

export type ValueKeyframe = string | number

export type UnresolvedValueKeyframe = ValueKeyframe | null

export type Easing =
  | "linear"
  | "ease"
  | "ease-in"
  | "ease-out"
  | "ease-in-out"
  | "steps-start"
  | "steps-end"
  | `steps(${number}, ${"start" | "end"})`
  | BezierDefinition

export type EasingGenerator = {
  createAnimation: (
    keyframes: UnresolvedValueKeyframe[],
    getOrigin: () => string,
    isNumber: boolean,
    name?: string,
    value?: MotionValue
  ) => CustomAnimationSettings
}

export type KeyframeOptions = {
  duration?: number
  easing?: EasingGenerator | Easing | Easing[]
  offset?: number[]
}

export type PlaybackOptions = {
  delay?: number
  endDelay?: number
  repeat?: number
  direction?: PlaybackDirection
}

export type AnimationOptions = KeyframeOptions &
  PlaybackOptions & {
    allowWebkitAcceleration?: boolean
  }
