import {
  AnimationOptions,
  AnimationWithCommitStyles,
  MotionKeyframe,
} from "./types"
import { animateValue } from "./animate-value"

interface AnimationState {
  animations: AnimationWithCommitStyles[]
  finished: Promise<any>
  onCancel?: VoidFunction
}
/**
 * TODO:
 * - Allow value-specific options
 * - Handle onCancel
 */
export function animate(
  element: Element,
  keyframes: MotionKeyframe,
  { onCancel, ...options }: AnimationOptions
) {
  const state: Partial<AnimationState> = {
    animations: [],
    onCancel,
  }

  for (const key in keyframes) {
    const animation = animateValue(element, key, keyframes[key], options)
    animation && state.animations!.push(animation)
  }

  state.finished = Promise.all(
    state.animations!.map((animation) => animation.finished)
  )

  return new Proxy(state, controls)
}

const controls = {
  get: (target: AnimationState, key: string) => {
    switch (key) {
      case "stop":
      case "cancel":
        target.onCancel?.()
      case "finished":
        return target.finished
      case "currentTime":
      case "playbackRate":
        return target[0]?.[key]
      case "stop":
        return () => target.animations.forEach(stop)
      default:
        return () => target.animations.forEach((animation) => animation[key]())
    }
  },
  set: (target: AnimationState, key: string, value: number) => {
    switch (key) {
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
