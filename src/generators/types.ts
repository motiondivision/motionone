export type AnimationGenerator = {
  next: (
    t: number
  ) => {
    value: number
    done: boolean
    velocity: number
  }
}
