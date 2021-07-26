import { RefObject, useEffect } from "react"
import { MotionKeyframes } from "../../dom/types"
import {
  AnimatedProps,
  AnimationContextProps,
  VariantActiveState,
} from "../types"
import { useGestureState } from "./use-gesture-state"

export function useViewport(
  ref: RefObject<Element>,
  target: MotionKeyframes,
  {
    inViewport,
    variants,
    viewport = {},
    onViewportEnter,
    onViewportLeave,
  }: AnimatedProps,
  { inViewport: inheritedInViewport }: AnimationContextProps,
  isVariantActive: VariantActiveState
) {
  const { root, margin: rootMargin, once, threshold } = viewport

  const [isInViewport, setViewportState] = useGestureState(
    target,
    inViewport,
    inheritedInViewport,
    variants
  )
  isVariantActive.inViewport = isInViewport

  let shouldObserve = !!inViewport || !!onViewportEnter || !!onViewportLeave
  if (once && isInViewport) shouldObserve = false

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
    inViewport,
    onViewportEnter,
    onViewportLeave,
    root,
    rootMargin,
    threshold,
  ])
}
