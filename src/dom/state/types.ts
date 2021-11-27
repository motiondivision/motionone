import {
  AnimationOptions,
  MotionKeyframes,
  MotionKeyframesDefinition,
} from "../types"

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
}

export interface Options {
  initial?: VariantDefinition
  animate?: VariantDefinition
  inView?: VariantDefinition
  hover?: VariantDefinition
  press?: VariantDefinition
  variants?: Variants
}

export interface MotionStateContext {
  initial?: string
  animate?: string
  inView?: string
  hover?: string
  press?: string
}

export interface Variants {}

export type Variant = MotionKeyframesDefinition & {
  transition?: AnimationOptions
}

export type VariantDefinition = Variant | string
