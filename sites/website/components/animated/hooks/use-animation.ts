import {
  AnimationOptionsWithOverrides,
  MotionKeyframes,
  animateStyle,
} from "@motionone/dom"
import type { AnimationCallback, MotionCSSProperties } from "../types"
import { RefObject, useEffect, useRef } from "react"
import { hasChanged } from "../utils/has-changed"
import { getOptions } from "../utils/get-options"
import { noop } from "../utils/noop"

export function useAnimation(
  ref: RefObject<HTMLElement>,
  initial: MotionKeyframes | MotionCSSProperties,
  target: MotionKeyframes,
  options: AnimationOptionsWithOverrides,
  onStart?: AnimationCallback,
  onComplete?: AnimationCallback
) {
  const prevTarget = useRef(initial)

  useEffect(() => {
    const targetKeyframe: MotionKeyframes = {}

    const allKeys = new Set([
      ...Object.keys(target),
      ...Object.keys(prevTarget.current),
    ])

    allKeys.forEach((key) => {
      let next = target[key]

      if (!hasChanged(next, prevTarget.current[key])) return
      /**
       * TODO: If next is undefined, throw error or record a "base value"
       * to animate back down to
       */
      targetKeyframe[key] = next
    })

    if (Object.keys(targetKeyframe).length && ref.current) {
      onStart?.(targetKeyframe)
      const animationFactories = []

      for (const key in targetKeyframe) {
        const animation = animateStyle(
          ref.current,
          key,
          targetKeyframe[key]!,
          getOptions(options, key)
        )
        animationFactories.push(animation)
      }

      const animations = animationFactories
        .map((factory) => factory())
        .filter(Boolean)

      Promise.all(animations.map((animation: any) => animation.finished))
        .then(() => onComplete?.(targetKeyframe))
        .catch(noop)
    }

    prevTarget.current = target
  })
}
