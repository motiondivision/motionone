import { dispatchViewEvent } from "../utils/events"
import { Gesture } from "./types"
import { view } from "../../view/index"

export const inView: Gesture = {
  isActive: (options) => Boolean(options.inView),
  subscribe: (element, { enable, disable }, { view }) =>
    view(element, {
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
