import { AnimationData } from "./types"

const data = new WeakMap<Element, AnimationData>()

export function getAnimationData(element: Element): AnimationData {
  if (!data.has(element)) {
    data.set(element, {
      activeTransforms: [],
      activeAnimations: {},
    })
  }

  return data.get(element)!
}
