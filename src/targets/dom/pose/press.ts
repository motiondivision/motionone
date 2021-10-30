import { GestureHandler, GestureStateHandler } from "./types"

export const press: GestureHandler = (
  element: Element,
  { enable, disable }: GestureStateHandler
) => {
  const onPointerDown = () => {
    enable()
    window.addEventListener("pointerup", disable)
  }

  element.addEventListener("pointerdown", onPointerDown)

  return () => {
    element.removeEventListener("pointerdown", onPointerDown)
    window.removeEventListener("pointerup", disable)
  }
}
