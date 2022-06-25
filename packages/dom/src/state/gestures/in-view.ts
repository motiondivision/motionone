import { dispatchViewEvent } from "../utils/events"
import { Gesture } from "./types"
import { inView as inViewDom } from "../../in-view/index"

export const inView: Gesture = {
  isActive: (options) => Boolean(options.inView),
  subscribe: (element, { enable, disable }, { view }) =>
    inViewDom(element, {
      onEnter: (entry) => {
        enable()
        dispatchViewEvent(element, "viewenter", entry)
      },
      onLeave: (entry) => {
        disable()
        dispatchViewEvent(element, "viewleave", entry)
      },
      ...view,
    }),
}
