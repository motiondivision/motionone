export type EasingFunction = (v: number) => number

export type AnimationGeneratorState = {
  value: number
  target: number
  done: boolean
  velocity: number
  hasReachedTarget: boolean
}

export type AnimationGenerator = {
  next: (t: number) => AnimationGeneratorState
}

export type AnimationGeneratorFactory<Options> = (
  options: Options
) => AnimationGenerator
