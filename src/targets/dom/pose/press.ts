import { GestureHandler, GestureStateHandler } from "./types"
import { dispatchPointerEvent } from "./utils/events"

export const press: GestureHandler = (
  element: Element,
  { enable, disable }: GestureStateHandler
) => {
  const onPointerUp = (event: PointerEvent) => {
    disable()
    dispatchPointerEvent(element, "pressend", event)
    window.removeEventListener("pointerup", onPointerUp)
  }

  const onPointerDown = (event: PointerEvent) => {
    enable()
    dispatchPointerEvent(element, "pressstart", event)
    window.addEventListener("pointerup", onPointerUp)
  }

  element.addEventListener("pointerdown", onPointerDown)

  return () => {
    element.removeEventListener("pointerdown", onPointerDown)
    window.removeEventListener("pointerup", onPointerUp)
  }
}
