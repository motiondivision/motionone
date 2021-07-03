import { AnimationMetadata } from "./types"

const metadata = new WeakMap<Element, AnimationMetadata>()

export function getAnimationMetadata(element: Element) {
  if (!metadata.has(element)) {
    metadata.set(element, {
      animations: {},
      transformKeys: [],
      springGenerators: {},
    })
  }

  return metadata.get(element)!
}
