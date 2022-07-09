import { defaults, noop, time } from "@motionone/utils"
import type { AnimationControls, AnimationDriver } from "@motionone/types"
import type { AnimationFactory, AnimationWithCommitStyles } from "../types"
import { stopAnimation } from "./stop-animation"

interface MotionState {
  animations: AnimationWithCommitStyles[]
  duration: number
  startDriver?: () => void
  stopDriver?: () => void
  finished?: Promise<any>
}

const createAnimation = (factory: AnimationFactory) => factory()

export const withControls = (
  animationFactory: AnimationFactory[],
  duration = defaults.duration,
  driver?: AnimationDriver
) => {
  const animationControls = new Proxy(
    {
      animations: animationFactory.map(createAnimation).filter(Boolean),
      duration,
      startDriver: () => driver?.subscribe(animationControls),
      stopDriver: () => driver?.unsubscribe(animationControls),
    } as any,
    controls
  ) as AnimationControls

  if (driver) {
    driver.subscribe(animationControls)
  }

  return animationControls
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
        let time = activeAnimation?.[key] || 0
        return time ? time / 1000 : 0
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
          target.stopDriver?.()
          target.animations.forEach((animation) => stopAnimation(animation))
        }
      case "play": {
        return () => {
          target.startDriver?.()
          target.animations.forEach((animation) => animation.play())
        }
      }
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
