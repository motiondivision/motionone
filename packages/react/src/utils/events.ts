import { RefObject, useEffect } from "react"
import { MotionEventHandlers } from "../types"

export function addDomEvent(
  target: EventTarget,
  eventName: string,
  handler: EventListener,
  options?: AddEventListenerOptions
) {
  target.addEventListener(eventName, handler, options)
  return () => target.removeEventListener(eventName, handler, options)
}

const domEventName = (propName: string) =>
  propName.replace("on", "").toLowerCase()

export function useEvents(
  ref: RefObject<Element>,
  handlers: MotionEventHandlers
) {
  useEffect(() => {
    const subscriptions = Object.keys(handlers).map((name) =>
      addDomEvent(ref.current!, domEventName(name), handlers[name])
    )

    return () => {
      subscriptions.forEach((subscription) => subscription())
    }
  })
}
