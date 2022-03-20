import { time } from "@motionone/utils"
import { DevToolsPlugin, ValueAnimationMetadata } from "../../types"
import { store } from "../state"

function getAnimationsFromAnimationEvent({
  target,
  animationName,
}: AnimationEvent) {
  if (!target) return

  const element = target as HTMLElement

  const elementAnimations = element.getAnimations()
  const cssAnimation = elementAnimations.find(
    (animation) => (animation as CSSAnimation).animationName === animationName
  ) as CSSAnimation

  if (!cssAnimation) return

  const animationTiming = (
    cssAnimation.effect as KeyframeEffect
  ).getComputedTiming()
  const duration = time.s(animationTiming.duration as number)
  const iterations = animationTiming.iterations
  const repeat =
    iterations === Infinity ? "Infinity" : Math.max(0, (iterations ?? 1) - 1)

  const animationKeyframes = (
    cssAnimation.effect as KeyframeEffect
  ).getKeyframes()

  const valueAnimations = {}

  for (const {
    composite,
    computedOffset,
    easing,
    offset,
    ...values
  } of animationKeyframes) {
    for (const valueName in values) {
      if (!valueAnimations[valueName]) {
        valueAnimations[valueName] = {
          valueName,
          keyframes: [],
          options: {
            duration,
            repeat,
            easing: [],
            offset: [],
          },
        }
      }

      const { keyframes, options } = valueAnimations[valueName]
      if (keyframes.length) {
        options?.easing.push(easing)
      }
      options?.offset?.push(offset)
      keyframes?.push(values[valueName])
    }
  }

  return Object.values(valueAnimations) as ValueAnimationMetadata[]
}

function record(event: AnimationEvent) {
  const animations = getAnimationsFromAnimationEvent(event)

  if (animations) {
    animations.forEach(({ valueName, keyframes, options }) => {
      store
        .getState()
        .recordAnimation(
          event.target as HTMLElement,
          valueName,
          keyframes,
          options,
          "css-animation"
        )
    })
  }
}

export const cssAnimation: DevToolsPlugin = {
  id: "css-animation",
  onRecordStart: () => {
    window.addEventListener("animationstart", record)
  },
  onRecordEnd: () => {
    window.removeEventListener("animationstart", record)
  },
}
