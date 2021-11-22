import type {
  AcceptedElements,
  AnimationListOptions,
  Easing,
  MotionKeyframesDefinition,
} from "../types"

export type TimelineSegment =
  | [AcceptedElements, MotionKeyframesDefinition]
  | [AcceptedElements, MotionKeyframesDefinition, AnimationListOptions]

export type TimelineDefinition = TimelineSegment[]

export type NextTime = number | "<" | `+${number}` | `-${number}` | `${string}`

export interface ElementSequence {
  [key: string]: ValueSequence
}

export type AbsoluteKeyframe = {
  value: string | number | null
  at: number
  easing?: Easing
}

export type ValueSequence = AbsoluteKeyframe[]
