import { dispatchViewEvent } from "../utils/events"
import { Gesture } from "./types"
import { inView as inViewDom } from "../../gestures/in-view"

export const inView: Gesture = {
  isActive: (options) => Boolean(options.inView),
  subscribe: (element, { enable, disable }, { inViewOptions = {} }) => {
    const { once, ...viewOptions } = inViewOptions

    return inViewDom(
      element,
      (enterEntry) => {
        enable()
        dispatchViewEvent(element, "viewenter", enterEntry)

        if (!once) {
          return (leaveEntry) => {
            disable()
            dispatchViewEvent(element, "viewleave", leaveEntry)
          }
        }
      },
      viewOptions
    )
  },
}
