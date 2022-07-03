import { AnimationControls, AnimationOptions } from "@motionone/types"
import { ElementOrSelector } from "../../types"
import { resolveElements } from "../../utils/resolve-elements"
import { createScrollInfo } from "./info"
import { createOnScrollHandler } from "./on-scroll-handler"
import { OnScroll, OnScrollHandler, ScrollOptions } from "./types"

const scrollListeners = new WeakMap<Element, VoidFunction>()
const onScrollHandlers = new WeakMap<Element, Set<OnScrollHandler>>()

export type ScrollTargets = Array<HTMLElement>

const getEventTarget = (element: HTMLElement) =>
  element === document.documentElement ? window : element

/**
 * TODO:
 * -  Tests
 * -  Support offset without target shorthand
 * -  Support vw/vh/%/px
 * -  Test updating size only on resize
 * -  Provide ability to do multiple scroll animations on the same value
 * -  Scroll animations
 */
export function scroll(
  onScroll: OnScroll,
  options?: ScrollOptions
): VoidFunction
export function scroll(
  elementOrSelector: ElementOrSelector,
  onScroll: OnScroll,
  options?: ScrollOptions
): VoidFunction
export function scroll(
  a: OnScroll | ElementOrSelector,
  b?: ScrollOptions | OnScroll,
  c?: ScrollOptions
) {
  let containers: ScrollTargets = [document.documentElement]
  let onScroll: OnScroll
  let options: ScrollOptions

  if (typeof a === "function") {
    onScroll = a
    options = b as ScrollOptions
  } else {
    containers = resolveElements(a) as HTMLElement[]
    onScroll = b as OnScroll
    options = c as ScrollOptions
  }

  const sessionOnScrollHandlers = new WeakMap<
    Element | Window,
    OnScrollHandler
  >()

  containers.forEach((container) => {
    /**
     * Get the onScroll handlers for this container.
     * If one isn't found, create a new one.
     */
    let handlers = onScrollHandlers.get(container)
    if (!handlers) {
      handlers = new Set()
      onScrollHandlers.set(container, handlers)
    }

    /**
     * Create a new onScroll handler for the provided callback.
     */
    const info = createScrollInfo()
    const handler = createOnScrollHandler(container, onScroll, info, options)
    sessionOnScrollHandlers.set(container, handler)
    handlers.add(handler)

    /**
     * Check if there's a scroll event listener for this container.
     * If not, create one.
     */
    if (!scrollListeners.has(container) && handlers) {
      const listener = () => {
        if (!handlers) return

        for (const handler of handlers) handler.measure()
        for (const handler of handlers) handler.update()
        for (const handler of handlers) handler.notify()
      }

      scrollListeners.set(container, listener)

      getEventTarget(container).addEventListener("scroll", listener)
    }

    requestAnimationFrame(scrollListeners.get(container)!)
  })

  return () => {
    containers.forEach((container) => {
      /**
       * Check if we even have any handlers for this container.
       */
      let handlers = onScrollHandlers.get(container)
      if (!handlers) return

      /**
       * Get the handler for this scroll session's
       */
      const sessionHandler = sessionOnScrollHandlers.get(container)
      if (sessionHandler) handlers.delete(sessionHandler)
      sessionOnScrollHandlers.delete(container)

      if (!handlers.size) {
        const listener = scrollListeners.get(container)
        listener &&
          getEventTarget(container).removeEventListener("scroll", listener)
        scrollListeners.delete(container)
      }
    })
  }
}

scroll.timeline =
  (options: ScrollOptions = {}) =>
  (controls: AnimationControls) => {
    controls.pause()

    let driver: VoidFunction | undefined

    const startDriver = () => {
      if (driver) return

      const axis = options.axis || "y"
      driver = scroll((info) => {
        controls.currentTime = controls.duration * info[axis].progress
      }, options)
    }

    startDriver()

    return new Proxy(controls, {
      get: (target: AnimationControls, key: string) => {
        switch (key) {
          case "play": {
            return () => {
              if (!driver) startDriver()
            }
          }
          case "pause":
          case "stop": {
            return () => {
              driver?.()
              driver = undefined
              target[key]()
            }
          }
        }

        return Reflect.get(target, key)
      },
    })
  }
