import type {
  GestureSubscriptions,
  PoserOptions,
  Poses,
  AnimatedElement,
} from "./types"
import { gestures } from "./gestures"

const statePriority = ["style", ...Object.keys(gestures)]

export function animatedElement(
  poses: Poses,
  options: PoserOptions = {},
  parent?: AnimatedElement
): AnimatedElement {
  let element: Element
  let depth = parent ? parent.getDepth() + 1 : 0
  const children = new Set<AnimatedElement>()
  const gestureSubscriptions: GestureSubscriptions = {}
  const activeStates = statePriority.map(() => false)

  const invalidate = () => {}

  const setPoseState = (name: string, state: boolean) => () => {
    activeStates[name] = state
    invalidate()
  }

  /**
   * Add/remove gesture handlers based on whether we
   * have any poses defined for them.
   */
  const updateGestureHandlers = () => {
    for (const name in gestures) {
      const removeHandler = gestureSubscriptions[name]

      if (poses[name] && !removeHandler) {
        /**
         * If we've got a pose defined for this gesture but
         * no associated subscription, add event handlers.
         */
        const handler = gestures[name]
        gestureSubscriptions[name] = handler(element, {
          enable: setPoseState(name, true),
          disable: setPoseState(name, false),
        })
      } else if (!poses[name] && removeHandler) {
        /**
         * Or if we don't have a pose defined but there is
         * a subscription, remove it.
         */
        removeHandler()
        gestureSubscriptions[name] = undefined
      }
    }
  }

  const node: AnimatedElement = {
    mount: (newElement) => {
      element = newElement
      setPoseState("style", true)()
      updateGestureHandlers()
      parent?.addChild(node)
    },
    addChild: (child) => {
      children.add(child)
      return () => children.delete(child)
    },
    update: (newPoses, newOptions) => {
      poses = newPoses
      options = newOptions
      updateGestureHandlers()
      invalidate()
    },
    getDepth: () => depth,
  }

  return node
}
