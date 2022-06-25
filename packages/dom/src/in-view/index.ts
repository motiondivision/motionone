export interface InViewOptions {
  root?: Element
  once?: boolean
  margin?: string
  amount?: "some" | "all" | number
  onEnter?: (entry?: IntersectionObserverEntry) => void
  onLeave?: (entry: IntersectionObserverEntry) => void
}

const thresholds = {
  some: 0,
  all: 1,
}

export function inView(
  element: Element,
  { root, once, margin, amount = "some", onEnter, onLeave }: InViewOptions = {}
): VoidFunction {
  let stopObservation = () => {}

  if (typeof IntersectionObserver === "undefined") {
    requestAnimationFrame(() => onEnter?.())
    return stopObservation
  }

  let hasIntersected = false
  let isIntersecting = false

  const onIntersectionChange = (entry: IntersectionObserverEntry) => {
    /**
     * If no change in intersection, early return. If only meant to fire
     * once and we've already intersected, early return.
     */
    if (
      entry.isIntersecting === isIntersecting ||
      (once && entry.isIntersecting && hasIntersected)
    ) {
      return
    }

    isIntersecting = entry.isIntersecting
    hasIntersected = hasIntersected || isIntersecting

    if (isIntersecting) {
      onEnter?.(entry)
      if (once) stopObservation()
    } else {
      onLeave?.(entry)
    }
  }

  const observer = new IntersectionObserver(
    ([entry]) => onIntersectionChange(entry),
    {
      root,
      rootMargin: margin,
      threshold: typeof amount === "number" ? amount : thresholds[amount],
    }
  )
  observer.observe(element)

  stopObservation = () => {
    observer.unobserve(element)
    observer.disconnect()
  }

  return stopObservation
}
