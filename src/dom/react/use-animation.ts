import { AnimationOptions } from "../types"
import { CSSProperties, RefObject, useEffect, useRef } from "react"
import { animate } from ".."
import { Keyframe } from "../types"
// import { animateSpring } from "../animate-spring"

export function useAnimation(
  ref: RefObject<HTMLElement>,
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
      // animateSpring(ref.current, "x", parseFloat(targetKeyframe.x as any), {
      //   stiffness: 200,
      //   damping: 10,
      // })
      animate(ref.current, targetKeyframe, options)
    }

    prevTarget.current = target
  })
}
