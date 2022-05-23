import { defaults, noop, time } from "@motionone/utils"
import type { AnimationControls } from "@motionone/types"
import type { AnimationFactory, AnimationWithCommitStyles } from "../types"
import { stopAnimation } from "./stop-animation"

interface MotionState {
  animations: AnimationWithCommitStyles[]
  duration: number
  finished?: Promise<any>
}

const createAnimation = (factory: AnimationFactory) => factory()

export const wrapAnimationWithControls = (
  animationFactory: AnimationFactory[],
  duration: number = defaults.duration
) =>
  new Proxy(
    {
      animations: animationFactory.map(createAnimation).filter(Boolean),
      duration,
    } as any,
    controls
  ) as AnimationControls

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
        let time = activeAnimation?.[key] || 0
        return time ? time / 1000 : 0
      case "playbackRate":
        return activeAnimation?.[key]
      case "finished":
        if (!target.finished) {
          target.finished = Promise.all(
            target.animations.map(selectFinished)
          ).catch(noop)
        }
        return target.finished
      case "stop":
        return () =>
          target.animations.forEach((animation) => stopAnimation(animation))
      default:
        return typeof activeAnimation?.[key] === "undefined"
          ? undefined
          : () => target.animations.forEach((animation) => animation[key]())
    }
  },
  set: (target: MotionState, key: string, value: number) => {
    switch (key) {
      case "currentTime":
        value = time.ms(value)
      case "currentTime":
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
