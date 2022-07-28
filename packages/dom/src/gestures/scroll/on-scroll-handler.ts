import { AnimationControls } from "@motionone/types"
import { noopReturn, isFunction } from "@motionone/utils"
import { updateScrollInfo } from "./info"
import { resolveOffsets } from "./offsets/index"
import {
  AxisScrollInfo,
  OnScroll,
  OnScrollHandler,
  ScrollInfo,
  ScrollOptions,
} from "./types"

let id = 0

function getSessionId() {
  const sessionId = id
  id++
  return sessionId
}

function measure(
  container: HTMLElement,
  target: Element = container,
  info: ScrollInfo
) {
  /**
   * Find inset of target within scrollable container
   */
  info.x.targetOffset = 0
  info.y.targetOffset = 0
  if (target !== container) {
    let node = target as HTMLElement
    while (node && node != container) {
      info.x.targetOffset += node.offsetLeft
      info.y.targetOffset += node.offsetTop
      node = node.offsetParent as HTMLElement
    }
  }

  info.x.targetLength =
    target === container ? target.scrollWidth : target.clientWidth
  info.y.targetLength =
    target === container ? target.scrollHeight : target.clientHeight
  info.x.containerLength = container.clientWidth
  info.y.containerLength = container.clientHeight
}

export function createOnScrollHandler(
  element: HTMLElement,
  onScroll: OnScroll | AnimationControls,
  info: ScrollInfo,
  options: ScrollOptions = {}
): OnScrollHandler {
  const axis = options.axis || "y"
  const sessionId = "" + getSessionId()

  return {
    measure: () => measure(element, options.target, info),
    update: (time) => {
      updateScrollInfo(element, info, time)

      if (options.offset || options.target) {
        resolveOffsets(element, info, options)
      }
    },
    getLatest: () => ({
      id: sessionId,
      container: element,
      options,
      info,
    }),
    notify: isFunction(onScroll)
      ? () => onScroll(info)
      : scrubAnimation(onScroll, info[axis]),
  }
}

function scrubAnimation(controls: AnimationControls, axisInfo: AxisScrollInfo) {
  controls.pause()

  /**
   * Normalize the animations to linear/1s to make them more
   * predictable to scrub through.
   *
   * TODO: Fix casting here
   */
  ;(controls as any).forEachNative((animation: any, { easing }: any) => {
    if (animation.updateDuration) {
      if (!easing) animation.easing = noopReturn
      animation.updateDuration(1)
    } else {
      const timingOptions: OptionalEffectTiming = { duration: 1000 }
      if (!easing) timingOptions.easing = "linear"

      animation.effect?.updateTiming?.(timingOptions)
    }
  })

  return () => {
    controls.currentTime = axisInfo.progress
  }
}
