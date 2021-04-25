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
