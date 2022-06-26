import { AcceptedElements } from "../animate/types"
import { resolveElements } from "../utils/resolve-elements"

export type ViewChangeHandler = (entry: IntersectionObserverEntry) => void

export interface ViewOptions {
  root?: Element
  margin?: string
  amount?: "any" | "all" | number
}

const thresholds = {
  any: 0,
  all: 1,
}

function polyfillIntersectionObserver(
  elements: Element[],
  onStart: ViewChangeHandler
) {
  requestAnimationFrame(() => {
    elements.forEach((element) => {
      onStart({
        boundingClientRect: new DOMRectReadOnly(),
        intersectionRatio: 1,
        intersectionRect: new DOMRectReadOnly(),
        isIntersecting: true,
        rootBounds: null,
        target: element,
        time: performance.now(),
      })
    })
  })
}

export function inView(
  elements: AcceptedElements,
  onStart: (entry: IntersectionObserverEntry) => void | ViewChangeHandler,
  { root, margin: rootMargin, amount = "any" }: ViewOptions = {}
): VoidFunction {
  const resolvedElements = resolveElements(elements)

  /**
   * If this browser doesn't support IntersectionObserver, resolve
   * onStart immediately with a dummy IntersectionObserverEntry.
   */
  if (typeof IntersectionObserver === "undefined") {
    polyfillIntersectionObserver(resolvedElements, onStart)
    return () => {}
  }

  const activeIntersections = new WeakMap<Element, ViewChangeHandler>()

  const onIntersectionChange: IntersectionObserverCallback = (entries) => {
    entries.forEach((entry) => {
      const onEnd = activeIntersections.get(entry.target)

      /**
       * If there's no change to the intersection, we don't need to
       * do anything here.
       */
      if (entry.isIntersecting === Boolean(onEnd)) return

      if (entry.isIntersecting) {
        const newOnEnd = onStart(entry)
        if (newOnEnd) {
          activeIntersections.set(entry.target, newOnEnd)
        } else {
          observer.unobserve(entry.target)
        }
      } else if (onEnd) {
        onEnd(entry)
        activeIntersections.delete(entry.target)
      }
    })
  }

  const observer = new IntersectionObserver(onIntersectionChange, {
    root,
    rootMargin,
    threshold: typeof amount === "number" ? amount : thresholds[amount],
  })

  resolvedElements.forEach((element) => observer.observe(element))

  return () => observer.disconnect()
}
