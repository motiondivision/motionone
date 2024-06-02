import { defaults, noop, time } from "@motionone/utils"
import type { AnimationControls, AnimationOptions } from "@motionone/types"
import type { AnimationFactory, AnimationWithCommitStyles } from "../types"
import { stopAnimation } from "./stop-animation"

interface MotionState {
  animations: AnimationWithCommitStyles[]
  duration: number
  finished?: Promise<any>
  options: AnimationOptions
}

const createAnimation = (factory: AnimationFactory) => factory()

export const withControls = (
  animationFactory: AnimationFactory[],
  options: AnimationOptions,
  duration = defaults.duration
) => {
  return new Proxy(
    {
      animations: animationFactory.map(createAnimation).filter(Boolean),
      duration,
      options,
    } as any,
    controls
  ) as AnimationControls
}
/**
 * TODO:
 * Currently this returns the first animation, ideally it would return
 * the first active animation.
 */
const getActiveAnimation = (
  state: MotionState
): AnimationWithCommitStyles | undefined => state.animations[0]

export const controls = {
  get: (target: MotionState, key: string) => {
    const activeAnimation = getActiveAnimation(target)

    switch (key) {
      case "duration":
        return target.duration
      case "currentTime":
        return time.s((activeAnimation?.[key] as number) || 0)
      case "playbackRate":
      case "playState":
        return activeAnimation?.[key]
      case "finished":
        if (!target.finished) {
          target.finished = Promise.all(
            target.animations.map(selectFinished)
          ).catch(noop)
        }
        return target.finished
      case "stop":
        return () => {
          target.animations.forEach((animation) =>
            stopAnimation(animation as any)
          )
        }
      case "forEachNative":
        /**
         * This is for internal use only, fire a callback for each
         * underlying animation.
         */
        return (
          callback: (
            animation: AnimationWithCommitStyles,
            state: MotionState
          ) => void
        ) => {
          target.animations.forEach((animation) => callback(animation, target))
        }
      default:
        return typeof activeAnimation?.[key as keyof typeof activeAnimation] ===
          "undefined"
          ? undefined
          : () =>
              target.animations.forEach((animation) =>
                (
                  animation[
                    key as keyof AnimationWithCommitStyles
                  ] as VoidFunction
                )()
              )
    }
  },
  set: (target: MotionState, key: string, value: number) => {
    switch (key) {
      case "currentTime":
        value = time.ms(value)
      // Fall-through
      case "playbackRate":
        for (let i = 0; i < target.animations.length; i++) {
          target.animations[i][key] = value
        }
        return true
    }
    return false
  },
}

const selectFinished = (animation: Animation) => animation.finished
