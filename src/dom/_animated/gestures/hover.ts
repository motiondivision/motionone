import type { GestureHandler } from "../types"
import { dispatchPointerEvent } from "../utils/events"

const mouseEvent = (
  element: Element,
  name: "hoverstart" | "hoverend",
  action: () => void
) => (event: PointerEvent) => {
  if (event.pointerType && event.pointerType !== "mouse") return
  action()
  dispatchPointerEvent(element, name, event)
}

export const hover: GestureHandler = (element, { enable, disable }) => {
  const onEnter = mouseEvent(element, "hoverstart", enable)
  const onLeave = mouseEvent(element, "hoverend", disable)

  element.addEventListener("pointerenter", onEnter as EventListener)
  element.addEventListener("pointerleave", onLeave as EventListener)

  return () => {
    element.removeEventListener("pointerenter", onEnter as EventListener)
    element.removeEventListener("pointerleave", onLeave as EventListener)
  }
}
