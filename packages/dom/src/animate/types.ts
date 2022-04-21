import type {
  AnimationOptions,
  BasicAnimationControls,
  UnresolvedValueKeyframe,
} from "@motionone/types"
import type { OptionResolver } from "../utils/stagger"
import type { NextTime } from "../timeline/types"
import { ValueKeyframe } from "@motionone/types"

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

export interface AnimationWithCommitStyles extends Animation {
  commitStyles: () => void
}

export type AnimationListOptions = Omit<
  AnimationOptionsWithOverrides,
  "delay" | "direction" | "repeat"
> & {
  delay?: number | OptionResolver<number>
  at?: NextTime
}

export interface CssPropertyDefinition {
  syntax: `<${string}>`
  initialValue: string | number
  toDefaultUnit: (v: number) => string | number
}

export type CssPropertyDefinitionMap = { [key: string]: CssPropertyDefinition }

export type AnimationFactory = () => BasicAnimationControls | undefined
