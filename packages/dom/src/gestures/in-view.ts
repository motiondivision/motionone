import { noop } from "@motionone/utils"
import { AcceptedElements } from "../animate/types"
import { resolveElements } from "../utils/resolve-elements"

let supportsDocumentRoot: boolean
function getDefaultRoot() {
  if (supportsDocumentRoot === undefined) {
    try {
      new IntersectionObserver(noop, { root: document })
      supportsDocumentRoot = true
    } catch (e) {
      supportsDocumentRoot = false
    }
  }

  return supportsDocumentRoot ? document : undefined
}

export type ViewChangeHandler = (entry: IntersectionObserverEntry) => void

export interface InViewOptions {
  root?: Element | Document
  margin?: string
  amount?: "any" | "all" | number
}

const thresholds = {
  any: 0,
  all: 1,
}

export function inView(
  elements: AcceptedElements,
  onStart: (entry: IntersectionObserverEntry) => void | ViewChangeHandler,
  { root, margin: rootMargin, amount = "any" }: InViewOptions = {}
): VoidFunction {
  /**
   * If this browser doesn't support IntersectionObserver, return a dummy stop function.
   * Default triggering of onStart is tricky - it could be used for starting/stopping
   * videos, lazy loading content etc. We could provide an option to enable a fallback, or
   * provide a fallback callback option.
   */
  if (typeof IntersectionObserver === "undefined") {
    return () => {}
  }

  const resolvedElements = resolveElements(elements)

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
        if (typeof newOnEnd === "function") {
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
    root: root || getDefaultRoot(),
    rootMargin,
    threshold: typeof amount === "number" ? amount : thresholds[amount],
  })

  resolvedElements.forEach((element) => observer.observe(element))

  return () => observer.disconnect()
}
