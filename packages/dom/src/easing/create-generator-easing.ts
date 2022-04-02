import type {
  CustomAnimationSettings,
  EasingGenerator,
  AnimationGenerator,
  AnimationGeneratorFactory,
} from "@motionone/types"
import type { KeyframesMetadata } from "@motionone/generators"
import {
  pregenerateKeyframes,
  calcGeneratorVelocity,
} from "@motionone/generators"

export function createGeneratorEasing<Options extends {} = {}>(
  createGenerator: AnimationGeneratorFactory<Options>
) {
  const keyframesCache = new WeakMap<AnimationGenerator, KeyframesMetadata>()

  return (options: Options = {} as Options): EasingGenerator => {
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
      createAnimation: (
        keyframes,
        getOrigin,
        canUseGenerator,
        name,
        motionValue
      ) => {
        let settings: CustomAnimationSettings
        const numKeyframes = keyframes.length

        let shouldUseGenerator =
          canUseGenerator &&
          numKeyframes <= 2 &&
          keyframes.every(isNumberOrNull)

        if (shouldUseGenerator) {
          const target = keyframes[numKeyframes - 1] as number
          const unresolvedOrigin = numKeyframes === 1 ? null : keyframes[0]

          let velocity = 0
          let origin = 0

          const prevGenerator = motionValue?.generator

          if (prevGenerator) {
            /**
             * If we have a generator for this value we can use it to resolve
             * the animations's current value and velocity.
             */
            const { animation, generatorStartTime } = motionValue!

            const startTime = animation?.startTime || generatorStartTime || 0
            const currentTime =
              animation?.currentTime || performance.now() - startTime
            const prevGeneratorCurrent = prevGenerator(currentTime).current

            origin = (unresolvedOrigin as number) ?? prevGeneratorCurrent

            if (
              numKeyframes === 1 ||
              (numKeyframes === 2 && keyframes[0] === null)
            ) {
              velocity = calcGeneratorVelocity(
                (t: number) => prevGenerator(t).current,
                currentTime,
                prevGeneratorCurrent
              )
            }
          } else {
            origin = (unresolvedOrigin as number) ?? parseFloat(getOrigin())
          }

          const generator = getGenerator(
            origin as number,
            target,
            velocity,
            name?.includes("scale")
          )

          const keyframesMetadata = getKeyframes(generator)
          settings = { ...keyframesMetadata, easing: "linear" }

          // TODO Add test for this
          if (motionValue) {
            motionValue.generator = generator
            motionValue.generatorStartTime = performance.now()
          }
        } else {
          const keyframesMetadata = getKeyframes(getGenerator(0, 100))

          settings = {
            easing: "ease",
            duration: keyframesMetadata.overshootDuration,
          }
        }

        return settings
      },
    }
  }
}

const isNumberOrNull = (value: null | number | string) =>
  typeof value !== "string"
