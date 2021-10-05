import { SpringOptions } from "./types"
import { createSpringGenerator } from "./generator"
import {
  AnimationData,
  CustomAnimationSettings,
  CustomEasing,
} from "../../../.."
import { AnimationGenerator, AnimationGeneratorState } from "../../types"
import {
  pregenerateKeyframes,
  KeyframesMetadata,
} from "../utils/pregenerate-keyframes"

export function spring(options: SpringOptions = {}): CustomEasing {
  const springCache = new Map<string, any>()
  const keyframesCache = new WeakMap<AnimationGenerator, KeyframesMetadata>()

  const getSpring = (from = 0, to = 100, velocity = 0, isScale = false) => {
    const key = `${from}-${to}-${velocity}-${isScale}`
    if (!springCache.has(key)) {
      springCache.set(
        key,
        createSpringGenerator({
          from,
          to,
          velocity,
          restSpeed: isScale ? 0.05 : 2,
          restDistance: isScale ? 0.01 : 0.5,
          ...options,
        })
      )
    }

    return springCache.get(key) as AnimationGenerator
  }

  const getKeyframes = (
    generator: AnimationGenerator,
    origin: number,
    target: number
  ) => {
    if (!keyframesCache.has(generator)) {
      keyframesCache.set(
        generator,
        pregenerateKeyframes(generator, origin, target)
      )
    }

    return keyframesCache.get(generator) as KeyframesMetadata
  }

  return {
    createAnimation: (keyframes, getOrigin, canUseRealSpring, name, data) => {
      let settings: CustomAnimationSettings
      let spring: AnimationGenerator
      const numKeyframes = keyframes.length

      let shouldUseRealSpring =
        canUseRealSpring && numKeyframes <= 2 && keyframes.every(isNumberOrNull)

      if (shouldUseRealSpring) {
        const prevAnimationState =
          name && data && getPreviousAnimationState(name, data)
        const velocity =
          prevAnimationState &&
          (numKeyframes === 1 || (numKeyframes === 2 && keyframes[0] === null))
            ? prevAnimationState.velocity
            : 0

        const target = keyframes[numKeyframes - 1] as number
        const unresolvedOrigin = numKeyframes === 1 ? null : keyframes[0]
        const origin =
          unresolvedOrigin === null
            ? prevAnimationState
              ? prevAnimationState.value
              : parseFloat(getOrigin())
            : (unresolvedOrigin as number)

        spring = getSpring(
          origin as number,
          target,
          velocity,
          name?.includes("scale")
        )
        const keyframesMetadata = getKeyframes(spring, origin, target)
        settings = { ...keyframesMetadata, easing: "linear" }
      } else {
        spring = getSpring(0, 100)
        const keyframesMetadata = getKeyframes(spring, 0, 100)

        settings = {
          easing: "ease",
          duration: keyframesMetadata.overshootDuration,
        }
      }

      return settings
    },
  }
}

function getPreviousAnimationState(
  name: string,
  data: AnimationData
): AnimationGeneratorState | undefined {
  const animation = data.activeAnimations[name]
  const generator = data.activeGenerators[name]
  if (animation && generator) {
    return generator.next((animation as any).currentTime)
  }
}

const isNumberOrNull = (value: null | number | string) =>
  typeof value !== "string"
