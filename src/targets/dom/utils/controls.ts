import { AnimationControls, AnimationWithCommitStyles } from "../types"
import { stopAnimation } from "./stop-animation"

interface AnimationState {
  animations: AnimationWithCommitStyles[]
  finished: Promise<any>
}

export function createAnimationControls(
  animations: AnimationWithCommitStyles[]
) {
  // TODO Duplication with animate
  const state = {
    animations,
    finished: Promise.all(animations.map((animation) => animation.finished)),
  } as any
  return new Proxy(state, controls) as AnimationControls
}

export const controls = {
  get: (target: AnimationState, key: string) => {
    switch (key) {
      case "finished":
        return target.finished
      case "currentTime":
        // TODO Find first active animation
        const duration = target.animations[0]?.[key] || 0
        return duration ? duration / 1000 : 0
      case "playbackRate":
        // TODO Find first active animation
        return target.animations[0]?.[key]
      case "stop":
        return () => target.animations.forEach(stopAnimation)
      default:
        return () => target.animations.forEach((animation) => animation[key]())
    }
  },
  set: (target: AnimationState, key: string, value: number) => {
    switch (key) {
      case "currentTime":
        value = value * 1000
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
