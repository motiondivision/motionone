import type {
  CustomAnimationSettings,
  EasingGenerator,
  AnimationGenerator,
  AnimationGeneratorFactory,
} from "@motionone/types"
import type { KeyframesMetadata } from "@motionone/generators"
import { pregenerateKeyframes } from "@motionone/generators"
import { isNumber, isString, noopReturn } from "@motionone/utils"
import { getUnitConverter } from "../animate/utils/get-unit"

type ToUnit = (value: number) => number | string

function canGenerate(value: any): value is number {
  return isNumber(value) && !isNaN(value)
}

function getAsNumber(value: string | number | null): number | null {
  return isString(value) ? parseFloat(value) : value
}

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

    const getKeyframes = (generator: AnimationGenerator, toUnit?: ToUnit) => {
      if (!keyframesCache.has(generator)) {
        keyframesCache.set(generator, pregenerateKeyframes(generator, toUnit))
      }

      return keyframesCache.get(generator) as KeyframesMetadata
    }

    return {
      createAnimation: (
        keyframes,
        shouldGenerate = true,
        getOrigin,
        name,
        motionValue
      ) => {
        let settings: CustomAnimationSettings | undefined

        let origin: number | undefined | null
        let target: number | undefined | null
        let velocity = 0
        let toUnit: undefined | ((value: number) => string | number) =
          noopReturn

        /**
         * If we should generate an animation for this value, run some preperation
         * like resolving target/origin, finding a unit (if any) and determine if
         * it is actually possible to generate.
         */
        if (shouldGenerate) {
          toUnit = getUnitConverter(keyframes)

          const targetDefinition = keyframes[keyframes.length - 1]

          target = getAsNumber(targetDefinition)

          if (keyframes.length > 1 && keyframes[0] !== null) {
            origin = getAsNumber(keyframes[0])
          } else {
            const prevGenerator = motionValue?.generator

            /**
             * If we have an existing generator for this value we can use it to resolve
             * the animation's current value and velocity.
             */
            if (prevGenerator) {
            } else if (getOrigin) {
              origin = getAsNumber(getOrigin())
            }
          }
        }
        console.log(origin, target)
        /**
         * If we've determined it is possible to generate an animation, do so.
         */
        if (canGenerate(origin) && canGenerate(target)) {
          const generator = getGenerator(
            origin,
            target,
            velocity,
            name?.includes("scale")
          )
          settings = { ...getKeyframes(generator, toUnit), easing: "linear" }

          // TODO Add test for this
          if (motionValue) {
            motionValue.generator = generator
            motionValue.generatorStartTime = performance.now()
          }
        }

        /**
         * If by now we haven't generated a set of keyframes, create a generic generator
         * based on the provided props that animates from 0-100 to fetch a rough
         * "overshootDuration" - the moment when the generator first hits the animation target.
         * Then return animation settings that will run a normal animation for that duration.
         */
        if (!settings) {
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
