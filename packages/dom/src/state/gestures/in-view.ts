import { dispatchViewEvent } from "../utils/events"
import { Gesture } from "./types"

/**
 * TODO: Support viewport options
 */
export const inView: Gesture = {
  isActive: (options) => Boolean(options.inView),
  subscribe: (element, { enable, disable }) => {
    let isVisible = false

    if (typeof IntersectionObserver !== "undefined") {
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
    } else {
      enable()
      return () => {}
    }
  },
}
