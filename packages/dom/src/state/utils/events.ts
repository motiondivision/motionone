import { MotionKeyframesDefinition } from "../../animate/types"
import { MotionEventNames } from "../types"

export const motionEvent = (
  name: MotionEventNames,
  target: MotionKeyframesDefinition
) => new CustomEvent(name, { detail: { target } })

export function dispatchPointerEvent(
  element: Element,
  name: MotionEventNames,
  event: PointerEvent
) {
  element.dispatchEvent(
    new CustomEvent(name, { detail: { originalEvent: event } })
  )
}

export function dispatchViewEvent(
  element: Element,
  name: MotionEventNames,
  entry: IntersectionObserverEntry
) {
  element.dispatchEvent(
    new CustomEvent(name, { detail: { originalEntry: entry } })
  )
}
