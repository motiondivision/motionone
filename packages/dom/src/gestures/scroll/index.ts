import { AnimationControls } from "@motionone/types"
import { resize } from "../resize/index"
import { createScrollInfo } from "./info"
import { createOnScrollHandler } from "./on-scroll-handler"
import { OnScroll, OnScrollHandler, ScrollOptions } from "./types"

const scrollListeners = new WeakMap<Element, VoidFunction>()
const resizeListeners = new WeakMap<Element, VoidFunction>()
const onScrollHandlers = new WeakMap<Element, Set<OnScrollHandler>>()

function getDevToolsUpdateScroll() {
  return (window as any).__MOTION_DEV_TOOLS_SCROLL
}

export type ScrollTargets = Array<HTMLElement>

const getEventTarget = (element: HTMLElement) =>
  element === document.documentElement ? window : element

export function scroll(
  controls: AnimationControls,
  options?: ScrollOptions
): VoidFunction
export function scroll(
  onScroll: OnScroll,
  options?: ScrollOptions
): VoidFunction
export function scroll(
  onScroll: OnScroll | AnimationControls,
  { container = document.documentElement, ...options }: ScrollOptions = {}
) {
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

      const devTools = getDevToolsUpdateScroll()
      if (devTools) {
        for (const handler of containerHandlers!) devTools(handler.getLatest())
      }

      for (const handler of containerHandlers!) handler.notify()
    }

    scrollListeners.set(container, listener)

    const target = getEventTarget(container)
    window.addEventListener("resize", listener, { passive: true })
    if (container !== document.documentElement) {
      resizeListeners.set(container, resize(container, listener))
    }
    target.addEventListener("scroll", listener, { passive: true })
  }

  const listener = scrollListeners.get(container)!
  const onLoadProcesss = requestAnimationFrame(listener)

  return () => {
    if (typeof onScroll !== "function") onScroll.stop()

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
      resizeListeners.get(container)?.()
      window.removeEventListener("resize", listener)
    }
  }
}
