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
import { AcceptedElements, AnimationFactory } from "../types"
import { noop } from "../../../utils/noop"
import { style } from "../style"
import { getPose } from "./utils/get-pose"
import { resolveElements } from "../utils/resolve-elements"
import { poseEvent } from "./utils/events"

const gestures = { style: () => () => {}, inView, hover, press }
const gestureNames = Object.keys(gestures)
const gesturePriority = [style, inView, hover, press]
const numGestures = gesturePriority.length

function processAnimations() {
  // Loop over all scheduled posers
  // Create animations
  // Execute animations
}

let id = 0
export function createPoser(
  element: HTMLElement | SVGElement,
  poses: Poses,
  options: PoserOptions = {}
): Poser {
  const poserId = `${id++}`
  const childrenSelector = `[data-pose]:not([data-pose="${poserId}"] [data-pose] [data-pose])`
  element.dataset.pose = poserId

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

    const children = element.querySelectorAll(childrenSelector)

    const animations = animationFactories
      .map((factory) => factory())
      .filter(Boolean)

    if (!animations.length) return

    element.dispatchEvent(poseEvent("posestart", target))
    Promise.all(animations.map((animation: any) => animation.finished))
      .then(() => element.dispatchEvent(poseEvent("posecomplete", target)))
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
  elements: AcceptedElements,
  poses: Poses,
  options: PoserOptions = {}
) {
  resolveElements(elements).forEach((element) => {
    if (cache.has(element)) {
      const poser = cache.get(element)!
      poser.update(poses, options)
    } else {
      const poser = createPoser(element as HTMLElement, poses, options)
      cache.set(element, poser)
    }
  })
}
