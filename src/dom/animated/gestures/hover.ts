import type { GestureHandler, GestureStateHandler } from "../types"
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

export const hover: GestureHandler = (
  element: Element,
  { enable, disable }: GestureStateHandler
) => {
  const onEnter = mouseEvent(element, "hoverstart", enable)
  const onLeave = mouseEvent(element, "hoverend", disable)

  element.addEventListener("pointerenter", onEnter)
  element.addEventListener("pointerleave", onLeave)

  return () => {
    element.removeEventListener("pointerenter", onEnter)
    element.removeEventListener("pointerleave", onLeave)
  }
}
