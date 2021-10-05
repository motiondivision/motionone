export type EasingFunction = (v: number) => number

export type AnimationGeneratorState = {
  value: number
  done: boolean
  velocity: number
}

export type AnimationGenerator = {
  next: (t: number) => AnimationGeneratorState
}
