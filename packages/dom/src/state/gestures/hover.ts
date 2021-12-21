import { dispatchPointerEvent } from "../utils/events"
import { Gesture } from "./types"

const mouseEvent =
  (element: Element, name: "hoverstart" | "hoverend", action: VoidFunction) =>
  (event: PointerEvent) => {
    if (event.pointerType && event.pointerType !== "mouse") return
    action()
    dispatchPointerEvent(element, name, event)
  }

export const hover: Gesture = {
  isActive: (options) => Boolean(options.hover),
  subscribe: (element, { enable, disable }) => {
    const onEnter = mouseEvent(element, "hoverstart", enable)
    const onLeave = mouseEvent(element, "hoverend", disable)

    element.addEventListener("pointerenter", onEnter as EventListener)
    element.addEventListener("pointerleave", onLeave as EventListener)

    return () => {
      element.removeEventListener("pointerenter", onEnter as EventListener)
      element.removeEventListener("pointerleave", onLeave as EventListener)
    }
  },
}
