import type { ElementAnimationData } from "../types"
import { MotionValue } from "@motionone/types"

const data = new WeakMap<Element, ElementAnimationData>()

export function getAnimationData(element: Element): ElementAnimationData {
  if (!data.has(element)) {
    console.trace()
    data.set(element, {
      transforms: [],
      values: new Map(),
    })
  }

  return data.get(element)!
}

export function getMotionValue(
  motionValues: Map<string, MotionValue>,
  name: string
) {
  if (!motionValues.has(name)) {
    motionValues.set(name, new MotionValue())
  }

  return motionValues.get(name)!
}
