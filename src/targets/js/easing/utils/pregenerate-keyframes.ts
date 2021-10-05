import { AnimationGenerator } from "../../types"

export interface KeyframesMetadata {
  keyframes: number[]
  duration: number
  overshootDuration: number
}

const timeStep = 10
const maxDuration = 3000
export function pregenerateKeyframes(
  generator: AnimationGenerator,
  origin: number,
  target: number
): KeyframesMetadata {
  const keyframes: number[] = []
  let overshootDuration: number | undefined = undefined
  let timestamp = 0
  let state = generator.next(0)

  while (!state.done && timestamp < maxDuration) {
    state = generator.next(timestamp)
    keyframes.push(state.done ? target : state.value)

    if (overshootDuration === undefined) {
      if (
        (origin < target && state.value >= target) ||
        (origin > target && state.value <= target)
      ) {
        overshootDuration = timestamp
      }
    }

    timestamp += timeStep
  }

  const duration = timestamp - timeStep
  return {
    keyframes,
    duration: duration / 1000,
    overshootDuration: (overshootDuration ?? duration) / 1000,
  }
}
