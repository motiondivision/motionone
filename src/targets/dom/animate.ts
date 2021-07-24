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
    animation && state.animations!.push(animation)
  }

  state.finished = Promise.all(
    state.animations!.map((animation) => animation.finished)
  )

  return new Proxy(state, controls) as AnimationControls
}

const controls = {
  get: (target: AnimationState, key: string) => {
    console.log("getting", key)
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

/**
 *
 */
// export function animateAll(
//   elements: Element | Element[] | NodeListOf<Element> | string,
//   keyframes: Keyframe,
//   { delay = 0, onStart, onComplete, ...options }: AnimationOptions
// ) {
//   if (typeof elements === "string") {
//     elements = document.querySelectorAll(elements)
//   } else if (elements instanceof Element) {
//     elements = [elements]
//   }

//   const animations = Array.from(elements).map((element, i) => {
//     const elementOptions: ResolvedAnimationOptions = {}
//     for (const key in options) {
//       elementOptions[key] =
//         typeof options[key] === "function" ? options[key](i) : options[key]
//     }

//     return animate(element, keyframes, elementOptions)
//   })

//   onStart?.()

//   Promise.all(animations.map((animation) => animation.finished)).then(
//     onComplete
//   )

//   return animations
// }
