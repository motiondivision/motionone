import { convertToBezierString } from "../utils/bezier-string"
import { secondsToMilliseconds } from "../utils/convert-time"
import { getTargetKeyframe } from "../utils/get-target-keyframe"
import { mapTransformsToVariables } from "./transforms"
import { AnimationOptions, Keyframe } from "./types"

export function animate(
  element: HTMLElement,
  // elements: Element | Element[] | NodeListOf<Element> | string,
  keyframes: Keyframe | Keyframe[],
  options: AnimationOptions = {}
) {
  // if (typeof elements === "string") {
  //   elements = document.querySelectorAll(elements)
  // }

  // if (Array.isArray(elements) || elements instanceof NodeList) {
  //   const { stagger = 0, delay = 0 } = options
  //   return Array.from(elements).map((element, i) => {
  //     animate(element, keyframes, { ...options, delay: delay + stagger * i })
  //   })
  // }

  // const element = elements as HTMLElement
  let {
    delay = 0,
    duration = 0.3,
    repeat = 0,
    initialProgress: iterationStart = 0,
    easing = "ease",
  } = options

  delay = secondsToMilliseconds(delay)
  duration = secondsToMilliseconds(duration)
  keyframes = mapTransformsToVariables(element, keyframes)
  const finalTarget = getTargetKeyframe(keyframes)

  function onComplete() {
    // Set styles
    Object.assign(element.style, finalTarget)

    // Set CSS variables
    for (const key in finalTarget) {
      if (key.startsWith("--")) {
        element.style.setProperty(key, finalTarget[key] as string)
      }
    }

    options.onComplete?.()
  }

  options.onStart?.()

  const animation = element.animate(keyframes, {
    delay,
    duration,
    easing: Array.isArray(easing) ? convertToBezierString(easing) : easing,
    iterations: repeat + 1,
    iterationStart,
  })

  animation.finished.then(onComplete)

  return animation
}
