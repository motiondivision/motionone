import {
  AcceptedElements,
  AnimationOptionsWithOverrides,
  MotionKeyframes,
} from "../types"

export type TimelineSegment =
  | [AcceptedElements, MotionKeyframes]
  | [AcceptedElements, MotionKeyframes, AnimationOptionsWithOverrides]
  | [AcceptedElements, MotionKeyframes, AnimationOptionsWithOverrides, NextTime]

export type TimelineDefinition = TimelineSegment[]

export type NextTime = number | `+=${number}` | `-=${number}` | `${string}`
