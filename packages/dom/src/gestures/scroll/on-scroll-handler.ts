import { isString } from "@motionone/utils"
import { updateAxisProgress, updateScrollInfo } from "./info"
import { presetOffsets } from "./shared"
import {
  OnScroll,
  OnScrollHandler,
  ProgressIntersection,
  ScrollInfo,
  ScrollOptions,
} from "./types"

const namedEdges = {
  start: 0,
  center: 0.5,
  end: 1,
}

function resolveStringEdge(edge: string): number {
  return namedEdges[edge] ?? parseFloat(edge)
}

function isProgressIntersection(
  intersection: any
): intersection is ProgressIntersection {
  return Array.isArray(intersection)
}

function resolveOffsets(
  element: HTMLElement,
  info: ScrollInfo,
  options: ScrollOptions
) {
  let { offset: offsetDefinition = "all" } = options
  const { target = element, axis = "y" } = options
  const container = element

  if (isString(offsetDefinition)) {
    offsetDefinition = presetOffsets[offsetDefinition]
  }

  /**
   * Find inset of target within scrollable container
   */
  let inset = { x: 0, y: 0 }
  if (target !== container) {
    let node = options.target as HTMLElement
    while (node && node != element) {
      inset.x += node.offsetLeft
      inset.y += node.offsetTop
      node = node.offsetParent as HTMLElement
    }
  }

  const targetSize =
    target === container
      ? { width: target.scrollWidth, height: target.scrollHeight }
      : { width: target.clientWidth, height: target.clientHeight }

  const containerSize = {
    width: container.clientWidth,
    height: container.clientHeight,
  }
  console.log("target size", targetSize)
  const scrollDeltas = offsetDefinition.map((offset) => {
    const [targetOffset, containerOffset] = isProgressIntersection(offset)
      ? offset
      : offset.split(" ").map(resolveStringEdge)

    const length = axis === "x" ? "width" : "height"
    const targetPoint = targetOffset * targetSize[length] + inset[axis]
    const containerPoint = containerOffset * containerSize[length]

    return targetPoint - containerPoint
  })

  updateAxisProgress(info[axis], scrollDeltas[0], scrollDeltas[1])
  console.log("deltas", scrollDeltas[0], scrollDeltas[1], info[axis])
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
  onScroll: OnScroll,
  info: ScrollInfo,
  options: ScrollOptions = {}
): OnScrollHandler {
  return {
    measure: () => measure(element, options.target, info),
    update: () => {
      updateScrollInfo(element, info)

      if (options.offset || options.target) {
        resolveOffsets(element, info, options)
      }
    },
    notify: () => onScroll(info),
  }
}
