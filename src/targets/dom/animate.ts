import { getAnimationData } from "./data"
import {
  AnimationOptions,
  AnimationWithCommitStyles,
  MotionKeyframe,
} from "./types"
import { cubicBezierAsString } from "./utils/bezier-string"
import {
  browserSupportsCssRegisterProperty,
  isCssVar,
  registerCssVariable,
} from "./utils/css-var"
import { ms } from "./utils/time"
import {
  addTransformToElement,
  asTransformCssVar,
  isTransform,
  transformPropertyDefinitions,
} from "./utils/transforms"

/**
 * TODO:
 * - Support offsets
 * - Detect WAAPI support and set default canAnimateNatively
 * - Automatic interrupt by cancelling existing animation
 */
export function animateValue(
  element: Element,
  name: string,
  keyframes: string | number | Array<string | number>,
  {
    duration = 0.3,
    delay = 0,
    endDelay = 0,
    repeat = 0,
    easing = "ease",
    direction,
  }: AnimationOptions = {}
) {
  let canAnimateNatively = true

  keyframes = Array.isArray(keyframes) ? keyframes : [keyframes]

  let finalFrame = emptyCatch

  if (isTransform(name)) {
    addTransformToElement(element as HTMLElement, name)
    name = asTransformCssVar(name)

    // Convert numbers to default value types
    const definition = transformPropertyDefinitions.get(name)
    if (definition?.toDefaultUnit) {
      keyframes = keyframes.map((value) =>
        typeof value === "number" ? definition.toDefaultUnit!(value) : value
      )
    }
  }

  const target = keyframes[keyframes.length - 1]

  if (isCssVar(name)) {
    finalFrame = () =>
      (element as HTMLElement).style.setProperty(name, target as string)

    if (!browserSupportsCssRegisterProperty) {
      canAnimateNatively = false
    } else {
      registerCssVariable(name)
    }
  } else {
    finalFrame = () => ((element as HTMLElement).style[name] = target)
  }

  const data = getAnimationData(element)
  if (data.activeAnimations[name]) {
    stop(data.activeAnimations[name]!)
    data.activeAnimations[name] = undefined
  }

  if (canAnimateNatively) {
    const animation = element.animate(
      { [name]: keyframes } as PropertyIndexedKeyframes,
      {
        delay: ms(delay),
        duration: ms(duration),
        endDelay: ms(endDelay),
        easing: Array.isArray(easing) ? cubicBezierAsString(easing) : easing,
        direction,
        iterations: repeat + 1,
      }
    ) as AnimationWithCommitStyles

    data.activeAnimations[name] = animation

    animation.finished.then(finalFrame).catch(emptyCatch)

    return animation
  } else {
    finalFrame()
  }
}

/**
 * TODO:
 * - Allow value-specific options
 */
export function animate(
  element: Element,
  keyframes: MotionKeyframe,
  { onCancel, ...options }: AnimationOptions
) {
  const animations: AnimationWithCommitStyles[] = []
  for (const key in keyframes) {
    const animation = animateValue(element, key, keyframes[key], options)
    animation && animations.push(animation)
  }

  const finished = Promise.all(
    animations.map((animation) => animation.finished)
  )

  return new Proxy(animations, {
    get: (target, key) => {
      switch (key) {
        case "finished":
          return finished
        case "currentTime":
        case "playbackRate":
          return target[0]?.[key]
        case "stop":
          return () => target.forEach(stop)
        default:
          return () => target.forEach((animation) => animation[key]())
      }
    },
    set: (target, key, value: number) => {
      switch (key) {
        case "currentTime":
        case "playbackRate":
          for (let i = 0; i < target.length; i++) {
            target[i][key] = value
          }
          return true
      }
      return false
    },
  })
}

function stop(animation: AnimationWithCommitStyles) {
  animation.commitStyles()
  animation.cancel()
}

const emptyCatch = () => {}

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
