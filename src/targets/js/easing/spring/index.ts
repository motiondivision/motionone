import { SpringOptions } from "./types"
import { createSpringGenerator } from "./generator"
import {
  AnimationData,
  CustomAnimationSettings,
  CustomEasing,
} from "../../../.."
import { AnimationGenerator } from "../../types"
import {
  calcKeyframesDuration,
  pregenerateKeyframes,
} from "../utils/pregenerate-keyframes"

export function spring(options: SpringOptions = {}): CustomEasing {
  const springCache = new Map<string, any>()
  const keyframesCache = new WeakMap<AnimationGenerator, number[]>()

  const getSpring = (from = 0, to = 100, velocity = 0) => {
    const key = `${from}-${to}-${velocity}`
    if (!springCache.has(key)) {
      springCache.set(
        key,
        createSpringGenerator({ from, to, velocity, ...options })
      )
    }

    return springCache.get(key) as AnimationGenerator
  }

  const getKeyframes = (generator: AnimationGenerator, target: number) => {
    if (!keyframesCache.has(generator)) {
      keyframesCache.set(generator, pregenerateKeyframes(generator, target))
    }

    return keyframesCache.get(generator) as number[]
  }

  return {
    createAnimation: (keyframes, getOrigin, name, data) => {
      let settings: CustomAnimationSettings
      let spring: AnimationGenerator
      const numKeyframes = keyframes.length

      let shouldUseRealSpring =
        numKeyframes <= 2 && keyframes.every(isNumberOrNull)

      if (shouldUseRealSpring) {
        const velocity =
          name &&
          data &&
          // [number] || [null, number]
          (numKeyframes === 1 || (numKeyframes === 2 && keyframes[0] === null))
            ? getVelocityFromAnimation(name, data)
            : 0

        const target = keyframes[numKeyframes - 1] as number
        const unresolvedOrigin = numKeyframes === 1 ? null : keyframes[0]
        const origin =
          unresolvedOrigin === null ? parseFloat(getOrigin()) : unresolvedOrigin

        spring = getSpring(origin as number, target, velocity)
        const generatedKeyframes = getKeyframes(spring, target)
        settings = {
          easing: "linear",
          keyframes: generatedKeyframes,
          duration: calcKeyframesDuration(generatedKeyframes),
        }
      } else {
        spring = getSpring(0, 100)
        const generatedKeyframes = getKeyframes(spring, 100)

        settings = {
          easing: "ease",
          // TODO Replace this with target reached duration
          duration: calcKeyframesDuration(generatedKeyframes),
        }
      }

      return settings
    },
  }
}

function getVelocityFromAnimation(name: string, data: AnimationData) {
  let velocity = 0

  const animation = data.activeAnimations[name]
  const generator = data.activeGenerators[name]
  if (animation && generator) {
    const state = generator.next((animation as any).currentTime)
    velocity = state.velocity
  }

  return velocity
}

const isNumberOrNull = (value: null | number | string) =>
  typeof value !== "string"
