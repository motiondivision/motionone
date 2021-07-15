import { AnimationOptions } from "../dom/types"
import { AnimationCallback } from "../react/types"
import { CSSProperties, RefObject, useEffect, useRef } from "react"
import { animateValue } from "../dom/animate-value"
import { noop } from "../../utils/noop"

export function useAnimation(
  ref: RefObject<HTMLElement>,
  target?: CSSProperties,
  options?: AnimationOptions,
  onStart?: AnimationCallback,
  onComplete?: AnimationCallback
) {
  const prevTarget = useRef({})
  useEffect(() => {
    if (!target) return

    const targetKeyframe: CSSProperties = {}

    const allKeys = new Set([
      ...Object.keys(target),
      ...Object.keys(prevTarget.current),
    ])

    // TODO: Add equality check for keyframes
    allKeys.forEach((key) => {
      let next = target[key]

      if (next === prevTarget.current[key]) return

      /**
       * TODO: If next is undefined, throw error or record a "base value"
       * to animate back down to
       */

      targetKeyframe[key] = next
    })

    if (Object.keys(targetKeyframe).length && ref.current) {
      onStart?.(targetKeyframe)
      const animations = []
      for (const key in targetKeyframe) {
        const animation = animateValue(
          ref.current,
          key,
          targetKeyframe[key]!,
          options
        )
        animation && animations.push(animation)
      }
      Promise.all(animations.map((animation) => animation.finished))
        .then(() => onComplete?.(targetKeyframe))
        .catch(noop)
    }

    prevTarget.current = target
  })
}
