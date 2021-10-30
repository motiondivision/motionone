import { GestureHandler, GestureStateHandler } from "./types"

export const hover: GestureHandler = (
  element: Element,
  { enable, disable }: GestureStateHandler
) => {
  element.addEventListener("pointerenter", enable)
  element.addEventListener("pointerleave", disable)

  return () => {
    element.removeEventListener("pointerenter", enable)
    element.removeEventListener("pointerleave", disable)
  }
}
