export type BezierDefinition = [number, number, number, number]

export interface CSSStyleDeclarationWithTransform extends CSSStyleDeclaration {
  x: number | string
  y: number | string
  z: number
  rotateX: number | string
  rotateY: number | string
  rotateZ: number | string
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

export type ValueKeyframes = string | number | Array<string | number>

export type StyleKeyframe = {
  [K in keyof CSSStyleDeclarationWithTransform]?: ValueKeyframes
}

export type VariableKeyframe = {
  [key: `--${string}`]: ValueKeyframes
}

export type MotionKeyframe = StyleKeyframe & VariableKeyframe

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

export interface AnimationWithCommitStyles extends Animation {
  commitStyles: () => void
}

export interface AnimationControls {
  play: VoidFunction
  pause: VoidFunction
  stop: VoidFunction
  finish: VoidFunction
  cancel: VoidFunction
  finished: Promise<any>
  currentTime: number | null
  playbackRate: number
}

export interface CssPropertyDefinition {
  syntax: `<${string}>`
  initialValue: string | number
  toDefaultUnit?: (v: number) => string
}

export type CssPropertyDefinitionMap = { [key: string]: CssPropertyDefinition }
