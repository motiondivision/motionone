import { GestureHandler, GestureStateHandler } from "./types"
import { dispatchViewEvent } from "./utils/events"

export const inView: GestureHandler = (
  element: Element,
  { enable, disable }: GestureStateHandler
) => {
  let isVisible = false

  // TODO: Check IntersectionObserver exists as it can be disabled in iOS
  // and if it doesnt exist default state to always on
  const observer = new IntersectionObserver(([entry]) => {
    if (!isVisible && entry.isIntersecting) {
      enable()
      dispatchViewEvent(element, "viewenter", entry)
    } else if (isVisible && !entry.isIntersecting) {
      disable()
      dispatchViewEvent(element, "viewleave", entry)
    }

    isVisible = entry.isIntersecting
  })

  observer.observe(element)

  return () => {
    observer.unobserve(element)
    observer.disconnect()
  }
}
