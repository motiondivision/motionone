export interface AnimationGeneratorState {
  done: boolean
  hasReachedTarget: boolean
  current: number
  target: number
  velocity: number
}

export type AnimationGeneratorFactory<Options> = (
  options: Options
) => AnimationGenerator

export type AnimationGenerator = (t: number) => AnimationGeneratorState

export type BezierDefinition = [number, number, number, number]

export type PlayState = "idle" | "running" | "paused" | "finished"

export interface BasicAnimationControls {
  pause: () => void
  play: () => void
  commitStyles: () => void
  cancel: () => void
  playState: PlayState
}

export interface AnimationControls {
  play: VoidFunction
  pause: VoidFunction
  stop: VoidFunction
  finish: VoidFunction
  reverse: VoidFunction
  cancel: VoidFunction
  finished: Promise<any>
  currentTime: number | null
  duration: number
  playbackRate: number
}

export interface AnimationData {
  transforms: string[]
  // TODO: Replace these with MotionValues
  animations: { [key: string]: BasicAnimationControls | undefined }
  generators: { [key: string]: AnimationGenerator | undefined }
  prevGeneratorState: { [key: string]: AnimationGeneratorState | undefined }
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
    isTransform: boolean,
    name?: string,
    data?: AnimationData
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
