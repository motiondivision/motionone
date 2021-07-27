import {
  AnimationControls,
  AnimationOptionsWithOverrides,
  AnimationWithCommitStyles,
  MotionKeyframes,
} from "./types"
import { stopAnimation } from "./utils/stop-animation"
import { animateValue } from "./animate-value"
import { getOptions } from "./utils/options"

interface AnimationState {
  animations: AnimationWithCommitStyles[]
  finished: Promise<any>
}

export function animate(
  element: Element,
  keyframes: MotionKeyframes,
  options: AnimationOptionsWithOverrides = {}
) {
  const state: Partial<AnimationState> = {
    animations: [],
  }

  for (const key in keyframes) {
    const valueOptions = getOptions(options, key)
    const animation = animateValue(element, key, keyframes[key]!, valueOptions)
    animation && state.animations!.push(animation as any)
  }

  state.finished = Promise.all(
    state.animations!.map((animation) => animation.finished)
  )

  return new Proxy(state, controls) as AnimationControls
}

const controls = {
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
