export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

export type AcceptedElements =
  | Element
  | Element[]
  | NodeListOf<Element>
  | string

export type BezierDefinition = [number, number, number, number]

export interface CSSStyleDeclarationWithTransform
  extends Omit<CSSStyleDeclaration, "direction"> {
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

export type SpringOptions = {
  stiffness?: number
  damping?: number
  mass?: number
  velocity?: number
  restSpeed?: number
  restDelta?: number
}

export type KeyframeOptions = {
  duration?: number
  easing?: Easing | Easing[]
  offset?: number[]
}

export type AnimationOptions = SpringOptions &
  KeyframeOptions & {
    delay?: number
    endDelay?: number
    repeat?: number
    direction?: "normal" | "reverse" | "alternate" | "alternate-reverse"
  }

export interface AnimationWithCommitStyles extends Animation {
  commitStyles: () => void
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
  playbackRate: number
}

export interface CssPropertyDefinition {
  syntax: `<${string}>`
  initialValue: string | number
  toDefaultUnit: (v: number) => string | number
}

export type CssPropertyDefinitionMap = { [key: string]: CssPropertyDefinition }

export interface PregeneratedAnimation {
  keyframes: Array<string | number>
  duration: number
}

export interface KeyframeGenerator {
  isKeyframeGenerator: true
  generate: (keyframes: number[]) => false | PregeneratedAnimation
}
