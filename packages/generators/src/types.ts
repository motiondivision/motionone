export interface AnimationGeneratorState {
  done: boolean
  hasReachedTarget: boolean
  current: number
  target: number
  velocity: number
}

export type AnimationGenerator = (t: number) => AnimationGeneratorState
