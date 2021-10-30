import { hasChanged } from "./utils/has-changed"
import { getOptions } from "../utils/options"
import { hover } from "./hover"
import { inView } from "./in-view"
import { press } from "./press"
import { GestureHandler, GestureSubscriptions, Poses, Pose } from "./types"
import { animateStyle } from "../animate-style"
import { AnimationFactory } from "../types"
import { noop } from "../../../utils/noop"
import { style } from "../style"
import { getPose } from "./utils/get-pose"

const gestures = { inView, hover, press }
const gestureNames = Object.keys(gestures)
const gesturePriority = [inView, hover, press]
const numGestures = gesturePriority.length

export function pose(element: Element, poses: Poses) {
  let target: Pose = getPose("initial", poses) || {}
  const baseTarget: Pose = { ...target }

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
        if (gesturePose.options) {
          animationOptions[key] = getOptions(gesturePose.options, key)
        }
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
      if (hasChanged(target[key], prevTarget[key])) {
        baseTarget[key] ??= style.get(element, key) as string

        animationFactories.push(
          animateStyle(element, key, target[key], animationOptions[key])
        )
      }
    })

    const animations = animationFactories
      .map((factory) => factory())
      .filter(Boolean)

    Promise.all(animations.map((animation: any) => animation.finished))
      .then(() => {})
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

  updateGestures()

  return {
    update: (newPoses: Poses) => {
      poses = newPoses
      updateGestures()
    },
    clean() {
      for (const key in gestureSubscriptions) {
        gestureSubscriptions[key]?.()
      }
    },
  }
}
