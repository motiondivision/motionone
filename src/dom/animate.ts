import { convertToBezierString } from "../utils/bezier-string"
import { secondsToMilliseconds } from "../utils/convert-time"
import { getTargetKeyframe } from "../utils/get-target-keyframe"
import { AnimationOptions, Keyframe } from "./types"

export function animate(
  elements: Element | Element[] | NodeListOf<Element> | string,
  keyframes: Keyframe | Keyframe[],
  options: AnimationOptions
) {
  if (typeof elements === "string") {
    elements = document.querySelectorAll(elements)
  }

  if (Array.isArray(elements) || elements instanceof NodeList) {
    const { stagger = 0, delay = 0 } = options
    return Array.from(elements).map((element, i) => {
      animate(element, keyframes, { ...options, delay: delay + stagger * i })
    })
  }

  const element = elements as HTMLElement
  let {
    delay = 0,
    duration = 0.3,
    repeat = 0,
    initialProgress: iterationStart,
    easing,
  } = options

  delay = secondsToMilliseconds(delay)
  duration = secondsToMilliseconds(duration)

  function onComplete() {
    Object.assign(element.style, getTargetKeyframe(keyframes))
  }

  const animation = element.animate(keyframes, {
    delay,
    duration,
    easing: Array.isArray(easing) ? convertToBezierString(easing) : easing,
    iterations: repeat + 1,
    iterationStart,
  })

  animation.finished.then(onComplete)
}
