export interface AxisScrollInfo {
  current: number
  min: number
  max: number
  progress: number
  total: number
  targetOffset: number
  targetLength: number
  containerLength: number
}

export interface ScrollInfo {
  x: AxisScrollInfo
  y: AxisScrollInfo
}

export type OnScroll = (info: ScrollInfo) => void

export type OnScrollHandler = {
  measure: () => void
  update: () => void
  notify: () => void
}

export type PresetOffset = "enter" | "exit" | "any" | "all"

export type Edge = "start" | "end" | number

export type ProgressIntersection = readonly [number, number]

export type Intersection = `${Edge} ${Edge}`

export type ScrollOffset =
  | readonly [Intersection, Intersection]
  | readonly [ProgressIntersection, ProgressIntersection]
  | PresetOffset

export interface ScrollOptions {
  axis?: "x" | "y"
  target?: Element
  offset?: ScrollOffset
  smooth?: number
}
