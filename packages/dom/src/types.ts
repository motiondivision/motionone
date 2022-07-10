import type { MotionValue } from "@motionone/types"

export interface ElementAnimationData {
  transforms: string[]
  values: Map<string, MotionValue>
}

export type ElementOrSelector =
  | Element
  | Element[]
  | NodeListOf<Element>
  | string
