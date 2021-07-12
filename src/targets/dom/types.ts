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

export type AnimationEventHandlers = {
  onCancel?: () => void
}

export type AnimationOptions = {
  delay?: number
  endDelay?: number
  duration?: number
  easing?: Easing
  repeat?: number
  direction?: "normal" | "reverse" | "alternate" | "alternate-reverse"
} & AnimationEventHandlers

export interface AnimationWithCommitStyles extends Animation {
  commitStyles: () => void
}

export interface AnimationControls extends AnimationWithCommitStyles {
  stop: () => void
}

export interface CssPropertyDefinition {
  syntax: `<${string}>`
  initialValue: string | number
  toDefaultUnit?: (v: number) => string
}

export type CssPropertyDefinitionMap = { [key: string]: CssPropertyDefinition }
