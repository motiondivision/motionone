import type {
  AnimationOptionsWithOverrides,
  MotionKeyframes,
} from "@motionone/dom"
import type {
  AnimatedProps,
  AnimationContextProps,
  PoseActiveState,
} from "../types"
import { RefObject, useEffect } from "react"
import { useGestureState } from "./use-gesture-state"

export function useViewport(
  ref: RefObject<Element>,
  target: MotionKeyframes,
  options: AnimationOptionsWithOverrides,
  {
    inViewport,
    poses,
    viewport = {},
    onViewportEnter,
    onViewportLeave,
  }: AnimatedProps,
  { inViewport: inheritedInViewport }: AnimationContextProps,
  isPoseActive: PoseActiveState
) {
  const { root, margin: rootMargin, once, threshold } = viewport

  const [isInViewport, setViewportState] = useGestureState(
    target,
    options,
    inViewport,
    inheritedInViewport,
    poses
  )
  isPoseActive.inViewport = isInViewport

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
