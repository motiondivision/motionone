import {
  AnimationOptionsWithOverrides,
  MotionKeyframes,
  MotionKeyframesDefinition,
} from "../animate/types"

export interface Target {
  [key: string]: string | number
}

export interface MotionState {
  update: (options: Options) => void
  getDepth: () => number
  getTarget: () => MotionKeyframes
  getOptions: () => Options
  getContext: () => MotionStateContext
  mount: (element: Element) => () => void
  animateUpdates: () => Generator<void>
}

export interface Options {
  initial?: VariantDefinition
  animate?: VariantDefinition
  inView?: VariantDefinition
  hover?: VariantDefinition
  press?: VariantDefinition
  variants?: Variants
  transition?: AnimationOptionsWithOverrides
  onAnimationComplete?: (variant: Variant) => void
}

export interface MotionStateContext {
  initial?: string
  animate?: string
  inView?: string
  hover?: string
  press?: string
}

export type Variant = MotionKeyframesDefinition & {
  transition?: AnimationOptionsWithOverrides
}

export interface Variants {
  [key: string]: Variant
}

export type VariantDefinition = Variant | string
