import { useRef, createElement, forwardRef } from "react"
import { AnimatedProps, MotionCSSProperties } from "./types"
import { useAnimation } from "./use-animation"
import { useHover } from "./use-hover"
import { usePress } from "./use-press"
import { useExit } from "./use-exit"
import { convertKeyframesToStyles } from "./utils/keyframes"

export function createAnimatedComponent<Props extends {}>(Component: string) {
  function Animated(
    {
      options = {},
      style,
      initial,
      hover,
      press,
      exit,
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
    renderedStyle.current ||= convertKeyframesToStyles({ ...initial, ...style })

    const target = { ...initial, ...style }
    const hoverProps = useHover(target, hover, props)
    const pressProps = usePress(target, press, props)
    const onExitComplete = useExit(target, exit)

    const ref = useRef(null)
    useAnimation(
      ref,
      { ...style, ...initial },
      target,
      options,
      onStart,
      (animation) => {
        onComplete && onComplete(animation)
        onExitComplete && onExitComplete()
      }
    )

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
