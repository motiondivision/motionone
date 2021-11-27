import { MotionKeyframes } from "../types"
import { MotionState, MotionStateContext, Options } from "./types"
import { resolveVariant } from "./utils/resolve-variant"

const stateNames = ["initial", "animate"]

export function createMotionState(
  options: Options = {},
  parent?: MotionState
): MotionState {
  //@ts-ignore
  let element: Element
  let depth = parent ? parent.getDepth() + 1 : 0

  // const activeStates = stateNames.map((key) => key === "initial")

  const context: MotionStateContext = {}
  for (const name of stateNames) {
    context[name] =
      typeof options[name] === "string"
        ? options[name]
        : parent?.getContext()[name]
  }

  let { transition, ...target } =
    resolveVariant(options.initial ?? context.initial, options.variants) || {}

  // const baseTarget: Target = { ...target }

  return {
    update: (newOptions: Options) => {
      options = newOptions
    },
    getDepth: () => depth,
    getTarget: () => target as MotionKeyframes,
    getOptions: () => options,
    getContext: () => context,
    mount: (newElement) => {
      element = newElement

      return () => {
        // Stop all animations
        // Remove all gesture subscriptions
      }
    },
  }
}
