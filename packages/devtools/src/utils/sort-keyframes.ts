import { Keyframe } from "../types"

export function compareKeyframeByOffset(a: Keyframe, b: Keyframe) {
  return a.offset > b.offset ? 1 : -1
}

export function sortKeyframesByOffset(keyframes: {
  [key: string]: Keyframe
}): Keyframe[] {
  return Object.values(keyframes).sort(compareKeyframeByOffset)
}
