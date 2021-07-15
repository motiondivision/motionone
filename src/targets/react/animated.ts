import { useRef, useState, createElement, forwardRef } from "react"
import { AnimatedProps } from "./types"
import { useAnimation } from "./use-animation"
import { useHover } from "./use-hover"
import { usePress } from "./use-press"

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
    // TODO Map rendered style transforms to CSS vars
    const [renderedStyle] = useState(initial || style)
    const target = { ...style }
    const hoverProps = useHover(target, hover, props)
    const pressProps = usePress(target, press, props)

    const ref = useRef(null)
    useAnimation(ref, target, options, onStart, onComplete)

    return createElement(
      Component,
      Object.assign({}, props, hoverProps, pressProps, {
        style: renderedStyle,
        ref,
      })
    )
  }

  return forwardRef(Animated)
}
