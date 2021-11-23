import { AnimationState, Options, Target, Variant } from "./types"
import { resolveVariant } from "./utils/resolve-variant"

export function createAnimationState(
  options: Options = {},
  parent?: AnimationState
): AnimationState {
  let element: Element
  let depth = parent ? parent.getDepth() + 1 : 0

  let target: Variant =
    resolveVariant(
      options.initial || parent?.getOptions().initial,
      options.variants
    ) || {}

  const baseTarget: Target = { ...target }

  return {
    update: (newOptions: Options) => {
      options = newOptions
      console.log("run animations")
    },
    getDepth: () => depth,
    getTarget: () => target,
    getOptions: () => options,
    mount: (newElement) => {
      console.log("mounting", newElement)
      element = newElement
    },
    unmount: () => {
      // Stop all animations
      // Remove all gesture subscriptions
    },
  }
}
