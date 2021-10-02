import { SpringOptions } from "./types"
import { createSpringGenerator } from "./generator"
import { CustomEasing } from "../../../.."

export function spring(options: SpringOptions = {}): CustomEasing {
  const cache = new Map<string, any>()

  const getSpring = (from = 0, to = 100, velocity = 0) => {
    const key = `${from}-${to}-${velocity}`
    if (!cache.has(key)) {
      cache.set(key, createSpringGenerator({ from, to, velocity, ...options }))
    }

    return cache.get(key)
  }

  // TODO These are the same
  return {
    isCustomEasing: true,
    createVelocityEasing: getSpring,
    // createEasing: getSpring,
    // createVelocityBasedAnimation: (
    //   from: number,
    //   to: number,
    //   velocity: number
    // ) => {},
  }
}

/**
 * animate(target, {
 *   // Can't interpolate, return linear-easing and calculated duration
 *   transform: "translateX(100px)"
 *   // Can get velocity and interpolate, return real spring
 *   x: 100,
 *   // Don't get velocity, return linear-easing and sum calculated duration
 *   x: [0, 100, 300]
 * }, {
 *    easing: spring()
 * })
 */
