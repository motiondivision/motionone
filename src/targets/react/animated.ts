import { useRef, createElement, forwardRef } from "react"
import { AnimatedProps, MotionCSSProperties } from "./types"
import { useAnimation } from "./use-animation"
import { useHover } from "./use-hover"
import { usePress } from "./use-press"
import { getInitialKeyframes } from "./utils/get-initial-keyframes"

export function createAnimatedComponent<Props extends {}>(Component: string) {
  function Animated(
    {
      options = {},
      style,
      initial,
      hover,
      press,
      onStart,
      onComplete,
      ...props
    }: Props & AnimatedProps,
    _externalRef: React.Ref<Element>
  ) {
    /**
     * We only ever pass the initally-provided styles to React, animating
     * further updates ourselves.
     */
    const renderedStyle = useRef<null | MotionCSSProperties>(null)
    renderedStyle.current ||= { ...initial, ...getInitialKeyframes(style) }

    const target = { ...style }
    const hoverProps = useHover(target, hover, props)
    const pressProps = usePress(target, press, props)

    const ref = useRef(null)
    useAnimation(ref, target, options, onStart, onComplete)

    return createElement(
      Component,
      Object.assign({}, props, hoverProps, pressProps, {
        style: renderedStyle.current,
        ref,
      })
    )
  }

  return forwardRef(Animated)
}
