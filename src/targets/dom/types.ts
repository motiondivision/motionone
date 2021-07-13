export type BezierDefinition = [number, number, number, number]

export interface MotionKeyframeValues {
  [key: string]: string | number
}

export interface MotionKeyframeOptions {
  easing?: Easing
  offset?: number
}

export type MotionKeyframe = MotionKeyframeValues & MotionKeyframeOptions

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

export type AnimationOptions = {
  delay?: number
  endDelay?: number
  duration?: number
  easing?: Easing | Easing[]
  repeat?: number
  direction?: "normal" | "reverse" | "alternate" | "alternate-reverse"
  offset?: number[]
}

export type ValueAnimationOptions = {
  [key: string]: AnimationOptions
}

export type AnimationOptionsWithOverrides = AnimationOptions &
  ValueAnimationOptions

export interface AnimationWithCommitStyles extends Animation {
  commitStyles: () => void
}

export interface AnimationControls {
  play: VoidFunction
  pause: VoidFunction
  stop: VoidFunction
  finish: VoidFunction
  cancel: VoidFunction
  currentTime: number | null
  playbackRate: number
}

export interface CssPropertyDefinition {
  syntax: `<${string}>`
  initialValue: string | number
  toDefaultUnit?: (v: number) => string
}

export type CssPropertyDefinitionMap = { [key: string]: CssPropertyDefinition }
