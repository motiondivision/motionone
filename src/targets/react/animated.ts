import { useRef, createElement, forwardRef } from "react"
import { AnimatedProps, MotionCSSProperties } from "./types"
import { useAnimation } from "./use-animation"
import { useHover } from "./use-hover"
import { usePress } from "./use-press"
import { useExit } from "./use-exit"
import { useViewport } from "./use-viewport"
import { convertKeyframesToStyles } from "./utils/keyframes"
import { resolveVariant } from "./utils/variants"

export function createAnimatedComponent<Props extends {}>(Component: string) {
  function Animated(
    {
      options = {},
      style,
      initial,
      hover,
      press,
      exit,
      inViewport,
      variants,
      onStart,
      onComplete,
      ...props
    }: Props & AnimatedProps,
    _externalRef: React.Ref<Element>
  ) {
    const ref = useRef(null)

    /**
     * We only ever pass the initally-provided styles to React, animating
     * further updates ourselves.
     */
    const renderedStyle = useRef<null | MotionCSSProperties>(null)
    const resolvedStyle = resolveVariant(style, variants)
    const resolvedInitial = resolveVariant(initial as any, variants)
    renderedStyle.current ||= convertKeyframesToStyles({
      ...resolvedStyle,
      ...resolvedInitial,
    })

    const target = { ...resolvedInitial, ...resolvedStyle }
    const hoverProps = useHover(target, hover, props)
    const pressProps = usePress(target, press, props)
    useViewport(ref, target, inViewport, props)
    const onExitComplete = useExit(target, exit)

    useAnimation(ref, { ...target }, target, options, onStart, (animation) => {
      onComplete && onComplete(animation)
      onExitComplete && onExitComplete()
    })

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
