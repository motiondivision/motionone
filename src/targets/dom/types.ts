export type BezierDefinition = [number, number, number, number]

// TODO: Add CSS variable template type
// TODO: Key as style
export interface Keyframe {
  [key: string]: string | number
}

export type Easing =
  | "linear"
  | "ease"
  | "ease-in"
  | "ease-out"
  | "ease-in-out"
  | "steps-start"
  | "steps-end"
  | `steps(${number}, ${"start" | "end"})`
  | BezierDefinition

export type AnimationEventHandlers = {
  onStart?: () => void
  onComplete?: () => void
  onCancel?: () => void
  onRepeat?: () => void
}

export type AnimationOptions = {
  delay?: number
  endDelay?: number
  duration?: number
  easing?: Easing
  repeat?: number
} & AnimationEventHandlers
