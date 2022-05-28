import type {
  AcceptedElements,
  AnimationListOptions,
  MotionKeyframesDefinition,
} from "../animate/types"
import type { Easing } from "@motionone/types"

export interface AnnotatedLabel {
  name: string
  at: NextTime
}

export type TimelineSegment =
  | [AcceptedElements, MotionKeyframesDefinition]
  | [AcceptedElements, MotionKeyframesDefinition, AnimationListOptions]
  | string
  | AnnotatedLabel

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
