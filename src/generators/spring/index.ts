import { KeyframeGenerator } from "../../targets/dom/types"
import { makeAnimatable } from "../../utils/value-types"
import { createSpringGenerator } from "./create"

/**
 * The resolution of pregenerated keyframes in milliseconds
 */
const pregenerationResolution = 10

/**
 * The max number of pregenerated keyframes. With pregenerationResolution this
 * gives us a maximum duration of two seconds.
 *
 * It could be possible to remove this limit if we polyfill some repeat
 * logic and generate a new set of keyframes each iteration.
 *
 * Alternatively, because individual keyframes (being CSS variables) run
 * on the main thread, it could also be possible simple to run these
 * animations synchronously.
 */
const maxPregeneratedKeyframes = 200

export const spring = (
  stiffness: number = 200,
  damping: number = 15,
  mass: number = 1,
  velocity?: number
): KeyframeGenerator => ({
  isKeyframeGenerator: true,
  generate: (definition) => {
    if (definition.length > 2) return false

    const keyframes: Array<number | string> = []

    const animatable = makeAnimatable(
      definition.length === 1 ? 0 : definition[0],
      definition[1] ?? definition[0]
    )

    if (animatable === false) return false

    const { from, to, toValueType } = animatable

    if (velocity === undefined) {
      // TODO generate initial velocity from existing animation
    }

    const generator = createSpringGenerator({
      stiffness,
      damping,
      mass,
      velocity,
      from,
      to,
    })
    let isComplete = false
    let numPregeneratedKeyframes = 0
    let t = 0

    while (!isComplete) {
      numPregeneratedKeyframes++

      const { value, done } = generator.next(t)
      keyframes.push(toValueType ? toValueType(value) : value)

      t += pregenerationResolution

      if (numPregeneratedKeyframes > maxPregeneratedKeyframes) {
        // TODO Warn in development mode
        isComplete = true
      } else {
        isComplete = done
      }
    }

    // TODO Return generator or set to element
    return { keyframes, duration: t }
  },
})
