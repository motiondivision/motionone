import { AnimationWithCommitStyles } from "./types"

export interface AnimationData {
  activeTransforms: string[]
  activeAnimations: { [key: string]: AnimationWithCommitStyles | undefined }
}

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
