export interface ViewOptions {
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

export function view(
  element: Element,
  { root, once, margin, amount = "some", onEnter, onLeave }: ViewOptions = {}
): VoidFunction {
  let stopObservation = () => {}

  if (typeof IntersectionObserver === "undefined") {
    requestAnimationFrame(() => onEnter?.())
    return stopObservation
  }

  let isIntersecting = false

  const onIntersectionChange = (entry: IntersectionObserverEntry) => {
    /**
     * If no change in intersection, early return. If only meant to fire
     * once and we've already intersected, early return.
     */
    if (entry.isIntersecting === isIntersecting) return

    isIntersecting = entry.isIntersecting

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
