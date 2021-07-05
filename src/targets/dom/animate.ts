import {
  Keyframe,
  AnimationOptions,
  AnimationWithCommitStyles,
  AnimationControls,
} from "./types"
import { cubicBezierAsString } from "./utils/bezier-string"
import { getTargetKeyframe } from "./utils/keyframes"
import { ms } from "./utils/time"

/**
 * TODO:
 *  - Fix keyframe type
 *  - Support multiple keyframes
 *  - Handle repeat and cancel events
 *  - Fix returned controls of animate
 *  - animateElemnt -> animate, animate -> animateList
 */
export function animate(
  element: Element,
  keyframes: Keyframe,
  {
    delay = 0,
    endDelay = 0,
    duration = 0.3,
    repeat = 0,
    easing = "ease",
    direction,
    onStart,
    onCancel,
    onComplete,
  }: AnimationOptions = {}
) {
  const animation = element.animate(keyframes, {
    delay: ms(delay),
    duration: ms(duration),
    endDelay: ms(endDelay),
    easing: Array.isArray(easing) ? cubicBezierAsString(easing) : easing,
    direction,
    iterations: repeat + 1,
    id: "test",
  })

  animation.finished
    .then(() => {
      const target = getTargetKeyframe(keyframes)
      Object.assign((element as HTMLElement).style, target)

      // TODO CSS variables
      // for (const key in finalTarget) {
      //   if (key.startsWith("--")) {
      //     element.style.setProperty(key, finalTarget[key] as string)
      //   }
      // }
      onComplete && onComplete()
    })
    .catch(() => {})

  onStart && onStart()
  onCancel && animation.addEventListener("cancel", onCancel)

  return new Proxy(animation, controls) as AnimationControls
}

const controls = {
  get: (target: AnimationWithCommitStyles, key: string) => {
    switch (key) {
      case "stop":
        return () => {
          target?.commitStyles()
          target.cancel()
        }
      default:
        return Reflect.get(target, key)
    }
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
