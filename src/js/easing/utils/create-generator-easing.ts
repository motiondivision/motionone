import { CustomAnimationSettings, CustomEasing } from "../../.."
import { AnimationGenerator, AnimationGeneratorFactory } from "../../types"
import {
  KeyframesMetadata,
  pregenerateKeyframes,
} from "./pregenerate-keyframes"

export function createGeneratorEasing<Options extends {} = {}>(
  createGenerator: AnimationGeneratorFactory<Options>
) {
  const keyframesCache = new WeakMap<AnimationGenerator, KeyframesMetadata>()

  return (options: Options = {} as Options): CustomEasing => {
    const generatorCache = new Map<string, AnimationGenerator>()

    const getGenerator = (
      from = 0,
      to = 100,
      velocity = 0,
      isScale = false
    ) => {
      const key = `${from}-${to}-${velocity}-${isScale}`
      if (!generatorCache.has(key)) {
        generatorCache.set(
          key,
          createGenerator({
            from,
            to,
            velocity,
            restSpeed: isScale ? 0.05 : 2,
            restDistance: isScale ? 0.01 : 0.5,
            ...options,
          })
        )
      }

      return generatorCache.get(key) as AnimationGenerator
    }

    const getKeyframes = (generator: AnimationGenerator) => {
      if (!keyframesCache.has(generator)) {
        keyframesCache.set(generator, pregenerateKeyframes(generator))
      }

      return keyframesCache.get(generator) as KeyframesMetadata
    }

    return {
      createAnimation: (keyframes, getOrigin, canUseGenerator, name, data) => {
        let settings: CustomAnimationSettings
        let generator: AnimationGenerator
        const numKeyframes = keyframes.length

        let shouldUseGenerator =
          canUseGenerator &&
          numKeyframes <= 2 &&
          keyframes.every(isNumberOrNull)

        if (shouldUseGenerator) {
          const prevAnimationState =
            name && data && data.prevGeneratorState[name]
          const velocity =
            prevAnimationState &&
            (numKeyframes === 1 ||
              (numKeyframes === 2 && keyframes[0] === null))
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

          generator = getGenerator(
            origin as number,
            target,
            velocity,
            name?.includes("scale")
          )
          const keyframesMetadata = getKeyframes(generator)
          settings = { ...keyframesMetadata, easing: "linear" }
        } else {
          generator = getGenerator(0, 100)

          const keyframesMetadata = getKeyframes(generator)

          settings = {
            easing: "ease",
            duration: keyframesMetadata.overshootDuration,
          }
        }

        // TODO Add test for this
        if (generator && data && name) {
          data.generators[name] = generator
        }

        return settings
      },
    }
  }
}

const isNumberOrNull = (value: null | number | string) =>
  typeof value !== "string"
