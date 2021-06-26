import { useRef, useState, createElement, forwardRef } from "react"
import { AnimatedProps } from "./types"
import { useAnimation } from "./use-animation"
import { useHover } from "./use-hover"
import { usePress } from "./use-press"

export function createAnimatedComponent<Props extends {}>(Component: string) {
  function Animated(
    {
      options,
      style,
      first,
      hover,
      press,
      onStart,
      onComplete,
      ...props
    }: Props & AnimatedProps,
    _externalRef: React.Ref<Element>
  ) {
    const [renderedStyle] = useState(first || style)
    const target = Object.assign({}, style) // TODO Replace with spread
    const hoverProps = useHover(target, hover, props)
    const pressProps = usePress(target, press, props)

    const ref = useRef(null)
    useAnimation(ref, target, Object.assign(options, { onStart, onComplete }))

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
