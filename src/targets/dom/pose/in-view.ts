import { GestureHandler, GestureStateHandler } from "./types"

export const inView: GestureHandler = (
  element: Element,
  { enable, disable }: GestureStateHandler
) => {
  const observer = new IntersectionObserver(([entry]) => {
    entry.isIntersecting ? enable() : disable()
  })

  observer.observe(element)

  return () => observer.disconnect()
}
