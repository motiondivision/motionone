import type { Pose, PoseEventNames } from "../types"

export const poseEvent = (name: PoseEventNames, target: Pose) =>
  new CustomEvent(name, { detail: { target } })

export function dispatchPointerEvent(
  element: Element,
  name: PoseEventNames,
  event: PointerEvent
) {
  element.dispatchEvent(
    new CustomEvent(name, { detail: { originalEvent: event } })
  )
}

export function dispatchViewEvent(
  element: Element,
  name: PoseEventNames,
  entry: IntersectionObserverEntry
) {
  element.dispatchEvent(
    new CustomEvent(name, { detail: { originalEntry: entry } })
  )
}
