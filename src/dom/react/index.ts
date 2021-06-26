import * as React from "react"
import { useEffect, useRef } from "react"
import { animate } from "../animate"
import { AnimationOptions, Keyframe } from "../types"

interface AnimatedProps {
  children?: React.ReactChild
  style: React.CSSProperties
  options?: AnimationOptions
}

export function useAnimation(
  ref: React.RefObject<Element>,
  target: React.CSSProperties,
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

function useInitialRender() {
  const isInitialRender = useRef(true)
  useEffect(() => {
    isInitialRender.current = false
  }, [])

  return isInitialRender.current
}

function createAnimatedComponent(Component: string) {
  function Animated(
    { options, style, first, ...props }: AnimatedProps,
    _externalRef: React.Ref<Element>
  ) {
    const ref = useRef(null)
    useAnimation(ref, style, options)

    const isInitialRender = useInitialRender()

    return React.createElement(Component, {
      ...props,
      style: isInitialRender && first ? first : style,
      ref,
    })
  }

  return React.forwardRef(Animated)
}

const components = new Map<string, any>()
export const animated = new Proxy(
  {},
  {
    get: (_, key: string) => {
      if (!components.has(key)) {
        components.set(key, createAnimatedComponent(key))
      }

      return components.get(key)!
    },
  }
)
