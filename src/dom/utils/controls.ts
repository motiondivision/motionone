import { noop } from "../../utils/noop"
import type {
  AnimationControls,
  AnimationFactory,
  AnimationWithCommitStyles,
} from "../types"
import { stopAnimation } from "./stop-animation"
import { ms } from "./time"

interface AnimationState {
  animations: AnimationWithCommitStyles[]
  duration: number
  finished?: Promise<any>
}

const createAnimation = (factory: AnimationFactory) => factory()

export const createAnimations = (
  animationFactory: AnimationFactory[],
  duration: number
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
  state: AnimationState
): AnimationWithCommitStyles | undefined => state.animations[0]

export const controls = {
  get: (target: AnimationState, key: string) => {
    switch (key) {
      case "duration":
        return target.duration
      case "currentTime":
        let time = getActiveAnimation(target)?.[key] || 0
        return time ? time / 1000 : 0
      case "playbackRate":
        return getActiveAnimation(target)?.[key]
      case "finished":
        if (!target.finished) {
          target.finished = Promise.all(
            target.animations.map(selectFinished)
          ).catch(noop)
        }
        return target.finished
      case "stop":
        return () => target.animations.forEach(stopAnimation)
      default:
        return () => target.animations.forEach((animation) => animation[key]())
    }
  },
  set: (target: AnimationState, key: string, value: number) => {
    switch (key) {
      case "currentTime":
        value = ms(value)
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
