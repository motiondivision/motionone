import { SpringOptions } from "./types"
import { createSpringGenerator } from "./generator"
import { CustomAnimationSettings, CustomEasing } from "../../../.."
import { AnimationGenerator } from "../../types"
import { style } from "../../../dom/style"

const sampleInterval = 10 // ms

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
    getAnimationSettings: (element, name, keyframes, _data) => {
      const settings: CustomAnimationSettings = { easing: "ease" }
      let spring: AnimationGenerator | undefined

      if (keyframes.length === 1 && typeof keyframes[0] === "number") {
        console.log("velocity spring!")

        settings.easing = "linear"
        // TODO: Read current value
        spring = getSpring(style.get(element, name), keyframes[0], 0)

        console.log("custom easing")
      } else if (
        keyframes.length === 2 &&
        typeof keyframes[0] === "number" &&
        typeof keyframes[1] === "number"
      ) {
        console.log("real spring, no velocity")
        settings.easing = "linear"
        spring = getSpring(keyframes[0], keyframes[1])
      } else if (keyframes.length < 3) {
        // TODO Combine with below
        const defaultSpring = getSpring(0, 100)
        let timestamp = 0
        let state = defaultSpring.next(timestamp)
        while (state.value <= 100) {
          timestamp += sampleInterval
          state = defaultSpring.next(timestamp)
        }

        /**
         * TODO: When a browser supports linear-easing, here we return
         *
         */
        settings.duration = timestamp
      }

      if (spring) {
        let timestamp = 0
        let state = spring.next(timestamp)
        const springKeyframes = [state.value]
        while (!state.done) {
          timestamp += sampleInterval
          state = spring.next(timestamp)
          springKeyframes.push(
            state.done ? (keyframes[0] as number) : state.value
          )
        }

        settings.keyframes = springKeyframes
        settings.duration = timestamp / 1000
        console.log(settings)
      }

      return settings
      /**
       * If this is a single keyframe, with just a number:
       *  - We can attempt a velocity based spring!
       *  - Get velocity from current animation
       *  - Generate custom spring from from/to/velocity
       *  - Get duration of custom spring
       *  - Set easing to linear
       * If this is a single keyframe, with a string:
       *  - Get duration of default spring
       *  - Generate linear-easing (in supported browsers)
       *  - Or set easing to "ease"
       */
    },
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
