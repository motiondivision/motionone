import * as React from "react"
import { useRef, useContext, useMemo, createElement, forwardRef } from "react"
import {
  AnimatedProps,
  AnimationContextProps,
  MotionCSSProperties,
  VariantActiveState,
} from "./types"
import { useAnimation } from "./hooks/use-animation"
import { useHover } from "./hooks/use-hover"
import { usePress } from "./hooks/use-press"
import { useExit } from "./hooks/use-exit"
import { useViewport } from "./hooks/use-viewport"
import { convertKeyframesToStyles } from "./utils/keyframes"
import { resolveVariant } from "./utils/variants"
import { AnimationContext } from "./context"

export function createAnimatedComponent<Props extends {}>(Component: string) {
  function Animated(
    props: Props & AnimatedProps,
    _externalRef: React.Ref<Element>
  ) {
    // TODO: Support externalRef if provided
    const ref = useRef(null)

    const {
      options = {},
      style,
      initial,
      hover,
      press,
      exit,
      inViewport,
      viewport,
      variants,
      onStart,
      onComplete,
      inherit = true,
      ...forwardProps
    } = props

    /**
     * Track throughout the render which variants are considered active and should
     * be passed to children.
     */
    const isVariantActive: VariantActiveState = { initial: true, style: true }

    /**
     * Inherit variants from the parent context,
     */
    let inherited = useContext(AnimationContext)
    if (!inherit) inherited = {}

    const resolvedStyle = resolveVariant(style, inherited.style, variants)
    const resolvedInitial = resolveVariant(
      initial as any,
      inherited.initial,
      variants
    )
    const initialTarget = { ...resolvedStyle, ...resolvedInitial }
    const target = { ...resolvedInitial, ...resolvedStyle }

    /**
     * If we haven't created a style prop for SSR yet (this is the initial render)
     * make one. We provide this to React every render as beyond that with manage style
     * via animations.
     */
    const styleProp = useRef<null | MotionCSSProperties>(null)
    styleProp.current ||= convertKeyframesToStyles(initialTarget)

    /**
     * Attach animation event handlers (gestures/exit/viewport appearance).
     * This are called in reverse order of which styles should take priority when
     * active, for example if there's a hover and press gesture active the press
     * gesture will take precedence.
     */
    const hoverProps = useHover(target, props, inherited, isVariantActive)
    const pressProps = usePress(target, props, inherited, isVariantActive)
    useViewport(ref, target, props, inherited, isVariantActive)
    const onExitComplete = useExit(target, props, inherited)

    /**
     * Compare our final calculated style target with the one from the previous render
     * and trigger any necessary animations.
     */
    useAnimation(ref, initialTarget, target, options, onStart, (animation) => {
      onComplete && onComplete(animation)
      onExitComplete && onExitComplete()
    })

    const element = createElement(
      Component,
      Object.assign({}, forwardProps, hoverProps, pressProps, {
        style: styleProp.current,
        ref,
      })
    )

    /**
     * Create a variant context to pass forward to child components.
     */
    const context: AnimationContextProps = variantProps.reduce((acc, key) => {
      acc[key] = undefined
      if (props[key]) {
        if (typeof props[key] === "string" && isVariantActive[key]) {
          acc[key] = props[key]
        }
      } else if (inherited[key]) {
        acc[key] = inherited[key]
      }

      return acc
    }, {})

    /**
     * Memoize the context so we only trigger a re-render in children if the values
     * within it change.
     */
    const memoizedContext = useMemo(() => context, Object.values(context))

    return (
      <AnimationContext.Provider value={memoizedContext}>
        {element}
      </AnimationContext.Provider>
    )
  }

  return forwardRef(Animated)
}

const variantProps = [
  "initial",
  "style",
  "hover",
  "press",
  "inViewport",
  "exit",
]
