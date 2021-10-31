import { hasChanged } from "./utils/has-changed"
import { getOptions } from "../utils/options"
import { hover } from "./hover"
import { inView } from "./in-view"
import { press } from "./press"
import {
  GestureHandler,
  GestureSubscriptions,
  Poses,
  Pose,
  PoserOptions,
  Poser,
} from "./types"
import { animateStyle } from "../animate-style"
import { AnimationFactory } from "../types"
import { noop } from "../../../utils/noop"
import { style } from "../style"
import { getPose } from "./utils/get-pose"

const gestures = { style: () => () => {}, inView, hover, press }
const gestureNames = Object.keys(gestures)
const gesturePriority = [style, inView, hover, press]
const numGestures = gesturePriority.length

export function createPoser(
  element: Element,
  poses: Poses,
  options: PoserOptions = {}
): Poser {
  let target: Pose = {}
  const baseTarget: Pose = {}
  const activeGestures = gestureNames.map(() => false)
  const gestureSubscriptions: GestureSubscriptions = {}

  const updateTarget = () => {
    const prevTarget = target
    target = {}
    const animationOptions = {}

    for (let i = 0; i < numGestures; i++) {
      const name = gestureNames[i]
      const gesturePose = getPose(name, poses)

      if (!activeGestures[name] || !gesturePose) continue

      for (const key in gesturePose) {
        if (key === "options") continue

        target[key] = gesturePose[key]
        animationOptions[key] = getOptions(gesturePose.options ?? options, key)
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

        animationFactories.push(
          animateStyle(
            element,
            key,
            target[key],
            animationOptions[key] || options
          )
        )
      }
    })

    const animations = animationFactories
      .map((factory) => factory())
      .filter(Boolean)

    if (!animations.length) return

    const { onAnimationStart, onAnimationComplete } = options
    onAnimationStart?.(target)
    Promise.all(animations.map((animation: any) => animation.finished))
      .then(() => {
        onAnimationComplete?.(target)
      })
      .catch(noop)
  }

  const setGesture = (name: string, state: boolean) => () => {
    activeGestures[name] = state
    updateTarget()
  }

  const updateGestures = () => {
    for (const name in gestures) {
      const removeHandler = gestureSubscriptions[name]
      if (poses[name] && !removeHandler) {
        const handler = gestures[name] as GestureHandler
        gestureSubscriptions[name] = handler(element, {
          enable: setGesture(name, true),
          disable: setGesture(name, false),
        })
      } else if (!poses[name] && removeHandler) {
        removeHandler()
        gestureSubscriptions[name] = undefined
      }
    }
  }

  setGesture("style", true)()
  updateGestures()

  return {
    update: (newPoses: Poses, newOptions: PoserOptions) => {
      poses = newPoses
      options = newOptions
      updateGestures()
      updateTarget()
    },
    clear() {
      for (const key in gestureSubscriptions) {
        gestureSubscriptions[key]?.()
      }
    },
  }
}

const cache = new WeakMap<Element, Poser>()
export function pose(
  element: Element,
  poses: Poses,
  options: PoserOptions = {}
) {
  if (cache.has(element)) {
    const poser = cache.get(element)!
    poser.update(poses, options)
    return poser
  } else {
    const poser = createPoser(element, poses, options)
    cache.set(element, poser)
    return poser
  }
}
