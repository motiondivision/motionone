import type { OptionResolver } from "../utils/stagger"
import type { AnimationGenerator, AnimationGeneratorState } from "../js/types"
import type { NextTime } from "../timeline/types"

export interface AnimationData {
  transforms: string[]
  animations: { [key: string]: BasicAnimationControls | undefined }
  generators: { [key: string]: AnimationGenerator | undefined }
  prevGeneratorState: { [key: string]: AnimationGeneratorState | undefined }
}

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

export type AcceptedElements =
  | Element
  | Element[]
  | NodeListOf<Element>
  | string

export type BezierDefinition = [number, number, number, number]

export interface CSSStyleDeclarationWithTransform
  extends Omit<CSSStyleDeclaration, "direction" | "transition"> {
  x: number
  y: number
  z: number
  rotateX: number
  rotateY: number
  rotateZ: number
  scaleX: number
  scaleY: number
  scaleZ: number
  skewX: number
  skewY: number
}

export type StyleAnimationOptions = {
  [K in keyof CSSStyleDeclarationWithTransform]?: AnimationOptions
}

export type VariableAnimationOptions = {
  [key: `--${string}`]: AnimationOptions
}

export type AnimationOptionsWithOverrides = StyleAnimationOptions &
  VariableAnimationOptions &
  AnimationOptions

export type ValueKeyframe = string | number

export type UnresolvedValueKeyframe = ValueKeyframe | null

export type ValueKeyframesDefinition =
  | ValueKeyframe
  | ValueKeyframe[]
  | UnresolvedValueKeyframe[]

export type StyleKeyframes = {
  [K in keyof CSSStyleDeclarationWithTransform]?:
    | ValueKeyframe
    | ValueKeyframe[]
}

export type VariableKeyframes = {
  [key: `--${string}`]: ValueKeyframe | ValueKeyframe[]
}

export type MotionKeyframes = StyleKeyframes & VariableKeyframes

export type StyleKeyframesDefinition = {
  [K in keyof CSSStyleDeclarationWithTransform]?: ValueKeyframesDefinition
}

export type VariableKeyframesDefinition = {
  [key: `--${string}`]: ValueKeyframesDefinition
}

export type MotionKeyframesDefinition = StyleKeyframesDefinition &
  VariableKeyframesDefinition

export type CustomAnimationSettings = {
  easing: Easing
  keyframes?: number[]
  duration?: number
}

export type CustomEasing = {
  createAnimation: (
    keyframes: UnresolvedValueKeyframe[],
    getOrigin: () => string,
    isTransform: boolean,
    name?: string,
    data?: AnimationData
  ) => CustomAnimationSettings
}

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

export type KeyframeOptions = {
  duration?: number
  easing?: CustomEasing | Easing | Easing[]
  offset?: number[]
}

export type PlaybackOptions = {
  delay?: number
  endDelay?: number
  repeat?: number
  direction?: "normal" | "reverse" | "alternate" | "alternate-reverse"
}

export type AnimationOptions = KeyframeOptions &
  PlaybackOptions & {
    allowWebkitAcceleration?: boolean
  }

export interface AnimationWithCommitStyles extends Animation {
  commitStyles: () => void
}

export type PlayState = "idle" | "running" | "paused" | "finished"

export interface BasicAnimationControls {
  pause: () => void
  play: () => void
  commitStyles: () => void
  cancel: () => void
  playState: PlayState
}

export type AnimationListOptions = Omit<
  AnimationOptionsWithOverrides,
  "delay"
> & {
  delay?: number | OptionResolver<number>
  at?: NextTime
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

export interface CssPropertyDefinition {
  syntax: `<${string}>`
  initialValue: string | number
  toDefaultUnit: (v: number) => string | number
}

export type CssPropertyDefinitionMap = { [key: string]: CssPropertyDefinition }

export type AnimationFactory = () => BasicAnimationControls | undefined
