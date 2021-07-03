export interface Keyframe {
  [key: string]: string | number
}

export type BezierDefinition = [number, number, number, number]

export interface AnimationMetadata {
  transformKeys: string[]
  transform?: string
  animations: { [key: string]: Animation }
  springGenerators: { [key: string]: any }
}

export interface AnimationOptions {
  delay?: number
  duration?: number
  easing?: string | BezierDefinition
  repeat?: number
  initialProgress?: number
  stagger?: number
  onStart?: () => void
  onComplete?: () => void
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
