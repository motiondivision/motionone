import { resize } from "../resize/index"
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
 * -  Scroll animations
 * =============================================
 * -  Smoothing
 */
export function scroll(
  options?: ScrollOptions
): (onScroll: OnScroll) => VoidFunction
export function scroll(
  onScroll: OnScroll,
  options?: ScrollOptions
): VoidFunction
export function scroll(a?: OnScroll | ScrollOptions, b: ScrollOptions = {}) {
  /**
   * Support overloading so we can set scroll(options) to animation.duration.
   */
  if (typeof a !== "function") {
    return (onScroll: OnScroll) => scroll(onScroll, a)
  }

  const onScroll = a
  const { container = document.documentElement, ...options } = b

  let containerHandlers = onScrollHandlers.get(container)

  /**
   * Get the onScroll handlers for this container.
   * If one isn't found, create a new one.
   */
  if (!containerHandlers) {
    containerHandlers = new Set()
    onScrollHandlers.set(container, containerHandlers)
  }

  /**
   * Create a new onScroll handler for the provided callback.
   */
  const info = createScrollInfo()
  const containerHandler = createOnScrollHandler(
    container,
    onScroll,
    info,
    options
  )
  containerHandlers.add(containerHandler)

  /**
   * Check if there's a scroll event listener for this container.
   * If not, create one.
   */
  if (!scrollListeners.has(container)) {
    const listener = () => {
      const time = performance.now()

      for (const handler of containerHandlers!) handler.measure()
      for (const handler of containerHandlers!) handler.update(time)
      for (const handler of containerHandlers!) handler.notify()
    }

    scrollListeners.set(container, listener)

    const target = getEventTarget(container)
    window.addEventListener("resize", listener, { passive: true })
    target.addEventListener("scroll", listener, { passive: true })
  }

  const listener = scrollListeners.get(container)!
  // TODO Move this to within scrollListeners lazy load
  const stopResize = resize(container, listener)
  const onLoadProcesss = requestAnimationFrame(listener)

  return () => {
    stopResize()
    cancelAnimationFrame(onLoadProcesss)

    /**
     * Check if we even have any handlers for this container.
     */
    const containerHandlers = onScrollHandlers.get(container)
    if (!containerHandlers) return

    containerHandlers.delete(containerHandler)

    if (containerHandlers.size) return

    /**
     * If no more handlers, remove the scroll listener too.
     */
    const listener = scrollListeners.get(container)
    scrollListeners.delete(container)

    if (listener) {
      getEventTarget(container).removeEventListener("scroll", listener)
      window.removeEventListener("resize", listener)
    }
  }
}

// scroll.timeline =
//   (options: ScrollOptions = {}) =>
//   (controls: AnimationControls) => {
//     controls.pause()

//     let driver: VoidFunction | undefined

//     const startDriver = () => {
//       if (driver) return

//       const axis = options.axis || "y"
//       driver = scroll((info) => {
//         controls.currentTime = controls.duration * info[axis].progress
//       }, options)
//     }

//     startDriver()

//     return new Proxy(controls, {
//       get: (target: AnimationControls, key: string) => {
//         switch (key) {
//           case "play": {
//             return () => {
//               if (!driver) startDriver()
//             }
//           }
//           case "pause":
//           case "stop": {
//             return () => {
//               driver?.()
//               driver = undefined
//               target[key]()
//             }
//           }
//         }

//         return Reflect.get(target, key)
//       },
//     })
//   }
