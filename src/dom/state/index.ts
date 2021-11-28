import { noop } from "../../utils/noop"
import { animateStyle } from "../animate-style"
import { style } from "../style"
import {
  AnimationFactory,
  AnimationOptionsWithOverrides,
  MotionKeyframes,
} from "../types"
import { getOptions } from "../utils/options"
import { MotionState, MotionStateContext, Options, Variant } from "./types"
import { hasChanged } from "./utils/has-changed"
import { resolveVariant } from "./utils/resolve-variant"
import { scheduleAnimation, unscheduleAnimation } from "./utils/schedule"

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

  let { transition: initialTransition, ...target } =
    resolveVariant(options.initial ?? context.initial, options.variants) || {}

  const baseTarget: Variant = { ...target }

  function* animateUpdates() {
    console.log("animate updates")
    const prevTarget = target
    target = {}

    const animationOptions: AnimationOptionsWithOverrides = {}
    for (const name of stateNames) {
      const variant = resolveVariant(options[name])

      if (!variant) continue

      for (const key in variant) {
        if (key === "transition") continue

        target[key] = variant[key]

        animationOptions[key] = getOptions(
          variant.transition ?? options.transition ?? {},
          key
        )
      }
    }

    const allTargetKeys = new Set([
      ...Object.keys(target),
      ...Object.keys(prevTarget),
    ])

    const animationFactories: AnimationFactory[] = []
    allTargetKeys.forEach((key) => {
      if (target[key] === undefined) {
        target[key] = baseTarget[key]
      }

      if (hasChanged(prevTarget[key], target[key])) {
        baseTarget[key] ??= style.get(element, key) as string
        console.log("animating", element, key, target[key], animationOptions)
        animationFactories.push(
          animateStyle(element, key, target[key], animationOptions[key])
        )
      }
    })

    yield

    const animations = animationFactories
      .map((factory) => factory())
      .filter(Boolean)

    if (!animations.length) return

    const animationTarget = target
    console.log("animating to", animationTarget)
    Promise.all(animations.map((animation: any) => animation.finished))
      .then(() => {
        console.log(options.onAnimationComplete)
        options.onAnimationComplete?.(animationTarget)
      })
      .catch(noop)
  }

  const state: MotionState = {
    update: (newOptions: Options) => {
      if (!element) return

      options = newOptions
      scheduleAnimation(state)
    },
    animateUpdates,
    getDepth: () => depth,
    getTarget: () => target as MotionKeyframes,
    getOptions: () => options,
    getContext: () => context,
    mount: (newElement) => {
      element = newElement

      return () => {
        console.log("unmounting")
        unscheduleAnimation(state)
        // Stop all animations
        // Remove all gesture subscriptions
      }
    },
  }

  return state
}
