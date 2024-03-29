import { dispatchPointerEvent } from "../utils/events"
import { Gesture } from "./types"

export const press: Gesture = {
  isActive: (options) => Boolean(options.press),
  subscribe: (element, { enable, disable }) => {
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

    element.addEventListener("pointerdown", onPointerDown as EventListener)

    return () => {
      element.removeEventListener("pointerdown", onPointerDown as EventListener)
      window.removeEventListener("pointerup", onPointerUp)
    }
  },
}
