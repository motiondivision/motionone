export interface Keyframe {
  [key: string]: string | number
}

export type BezierDefinition = [number, number, number, number]

export interface AnimationOptions {
  delay?: number
  duration?: number
  easing?: string | BezierDefinition
  repeat?: number
  initialProgress?: number
  stagger?: number
}

export type RelativeTimestamp = `-${number}` | `+${number}`

export type AbsoluteTimestamp = number

export type Definition = [string, Keyframe, AnimationOptions]

export type ParallelDefinition = Definition[]

export type StaggerDefinition = [number, ...Definition[]]

export type Fragment =
  | Definition
  | ParallelDefinition
  | StaggerDefinition
  | AbsoluteTimestamp
  | RelativeTimestamp

export type Sequence = Fragment[]
