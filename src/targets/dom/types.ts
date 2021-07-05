export type BezierDefinition = [number, number, number, number]

export type Easing =
  | "linear"
  | "ease"
  | "ease-in"
  | "ease-out"
  | "ease-in-out"
  | BezierDefinition

export type ResolvedAnimationOptions = {
  delay?: number
  endDelay?: number
  duration?: number
  easing?: Easing
  repeat?: number
  onStart?: () => void
  onComplete?: () => void
}

export type MakeIndexGenerated<T> = {
  [K in keyof T]: T[K] | ((i: number) => T[K])
} & {
  onStart?: () => void
  onComplete?: () => void
}

export type AnimationOptions = MakeIndexGenerated<ResolvedAnimationOptions>
