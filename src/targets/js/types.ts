export type EasingFunction = (v: number) => number

export type AnimationGenerator = {
  next: (
    t: number
  ) => {
    value: number
    done: boolean
    velocity: number
  }
}
