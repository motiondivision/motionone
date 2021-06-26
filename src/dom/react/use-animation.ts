import { AnimationOptions } from "../types"
import { CSSProperties, RefObject, useEffect, useRef } from "react"
import { animate } from ".."
import { Keyframe } from "../types"

export function useAnimation(
  ref: RefObject<Element>,
  target?: CSSProperties,
  options?: AnimationOptions
) {
  const prevTarget = useRef({})
  useEffect(() => {
    if (!target) return

    const targetKeyframe: Keyframe = {}

    for (const key in target) {
      if (target !== prevTarget.current[key]) {
        targetKeyframe[key] = target[key]
      }
    }

    if (Object.keys(targetKeyframe).length && ref.current) {
      animate(ref.current, targetKeyframe, options)
    }

    prevTarget.current = target
  })
}
