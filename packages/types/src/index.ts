import { MotionValue } from "./MotionValue"

export { MotionValue } from "./MotionValue"

export interface AnimationGeneratorState {
  done: boolean
  hasReachedTarget: boolean
  current: number
  target: number
}

export type ProgressFunction = (t: number) => void

export type AnimationGeneratorFactory<Options> = (
  options: Options
) => AnimationGenerator

export type AnimationGenerator = (t: number) => AnimationGeneratorState

export type BezierDefinition = readonly [number, number, number, number]

export type PlayState = "idle" | "running" | "paused" | "finished"

export interface BasicAnimationControls {
  play: VoidFunction
  pause: VoidFunction
  commitStyles: VoidFunction
  cancel: VoidFunction
  stop?: VoidFunction
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
  playState: AnimationPlayState
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
  easing?: EasingGenerator | Easing | Easing[] | EasingFunction
  offset?: number[]
}

export type OptionResolver<T> = (i: number, total: number) => T

export type PlaybackOptions = {
  delay?: number | OptionResolver<number>
  endDelay?: number
  repeat?: number
  direction?: PlaybackDirection
}

export type DevToolsOptions = {
  record?: boolean
}

export type AnimationOptions = KeyframeOptions &
  PlaybackOptions &
  DevToolsOptions & {
    allowWebkitAcceleration?: boolean
  }

export interface DevTools {
  record: (
    element: HTMLElement,
    valueName: string,
    keyframes: any,
    options: AnimationOptions
  ) => void
  isRecording: boolean
}

export type EasingFunction = (t: number) => number
