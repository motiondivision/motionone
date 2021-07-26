import { HTMLProps, RefObject, useEffect } from "react"
import { MotionKeyframes } from "../dom/types"
import { AnimatedProps } from "./types"
import { useGestureState } from "./use-gesture-state"

export function useViewport(
  ref: RefObject<Element>,
  target: MotionKeyframes,
  stylesToApply?: MotionKeyframes | string,
  {
    variants,
    viewport: root,
    viewportMargin: rootMargin,
    viewportThreshold: threshold,
    enterViewportOnce = false,
    onViewportEnter,
    onViewportLeave,
  }: AnimatedProps & HTMLProps<any> = {}
) {
  const [isInViewport, setViewportState] = useGestureState(
    target,
    stylesToApply,
    variants
  )
  let shouldObserve = !!stylesToApply || !!onViewportEnter || !!onViewportLeave
  if (enterViewportOnce && isInViewport) shouldObserve = false

  useEffect(() => {
    if (!shouldObserve || typeof IntersectionObserver === "undefined") return
    const observer = new IntersectionObserver(
      ([entry]) => {
        setViewportState(entry.isIntersecting)
        const callback = entry.isIntersecting
          ? onViewportEnter
          : onViewportLeave
        callback && callback(entry)
      },
      { root: root?.current, rootMargin, threshold }
    )

    observer.observe(ref.current!)
    return () => observer.disconnect()
  }, [
    stylesToApply,
    onViewportEnter,
    onViewportLeave,
    root,
    rootMargin,
    threshold,
  ])
}
