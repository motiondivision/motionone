import { GestureHandler, GestureStateHandler } from "./types"
import { dispatchPointerEvent } from "./utils/events"

export const hover: GestureHandler = (
  element: Element,
  { enable, disable }: GestureStateHandler
) => {
  const onEnter = (event: PointerEvent) => {
    enable()
    dispatchPointerEvent(element, "hoverstart", event)
  }

  const onLeave = (event: PointerEvent) => {
    disable()
    dispatchPointerEvent(element, "hoverend", event)
  }

  element.addEventListener("pointerenter", onEnter)
  element.addEventListener("pointerleave", onLeave)

  return () => {
    element.removeEventListener("pointerenter", onEnter)
    element.removeEventListener("pointerleave", onLeave)
  }
}
