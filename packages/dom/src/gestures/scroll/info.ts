import { progress } from "@motionone/utils"
import { AxisScrollInfo, ScrollInfo } from "./types"

const createAxisInfo = (): AxisScrollInfo => ({
  current: 0,
  min: 0,
  max: 0,
  progress: 0,
  total: 0,
  targetOffset: 0,
  targetLength: 0,
  containerLength: 0,
})

export const createScrollInfo = (): ScrollInfo => ({
  x: createAxisInfo(),
  y: createAxisInfo(),
})

const keys = {
  x: {
    length: "Width",
    position: "Left",
  },
  y: {
    length: "Height",
    position: "Top",
  },
}

export function updateAxisProgress(
  axis: AxisScrollInfo,
  min: number = 0,
  max: number = axis.total
) {
  axis.min = min
  axis.max = max
  axis.progress = progress(axis.min, axis.max, axis.current)
  console.log(axis.progress)
}

function updateAxisInfo(
  element: HTMLElement,
  axisName: "x" | "y",
  info: ScrollInfo
) {
  const axis = info[axisName]
  const { length, position } = keys[axisName]

  axis.current = element["scroll" + position]
  axis.total = element["scroll" + length] - element["client" + length]
  updateAxisProgress(axis)
}

export function updateScrollInfo(element: HTMLElement, info: ScrollInfo) {
  updateAxisInfo(element, "x", info)
  updateAxisInfo(element, "y", info)
}
