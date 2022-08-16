import { AnimationGenerator } from "@motionone/types"
import { noopReturn } from "@motionone/utils"

export interface KeyframesMetadata {
  keyframes: Array<string | number>
  duration: number
  overshootDuration: number
}

const timeStep = 10
const maxDuration = 10000
export function pregenerateKeyframes(
  generator: AnimationGenerator,
  toUnit: (value: number) => number | string = noopReturn
): KeyframesMetadata {
  let overshootDuration: number | undefined = undefined
  let timestamp = timeStep
  let state = generator(0)
  const keyframes: Array<string | number> = [toUnit(state.current)]

  while (!state.done && timestamp < maxDuration) {
    state = generator(timestamp)
    keyframes.push(toUnit(state.done ? state.target : state.current))

    if (overshootDuration === undefined && state.hasReachedTarget) {
      overshootDuration = timestamp
    }

    timestamp += timeStep
  }

  const duration = timestamp - timeStep

  /**
   * If generating an animation that didn't actually move,
   * generate a second keyframe so we have an origin and target.
   */
  if (keyframes.length === 1) keyframes.push(state.current)

  return {
    keyframes,
    duration: duration / 1000,
    overshootDuration: (overshootDuration ?? duration) / 1000,
  }
}
