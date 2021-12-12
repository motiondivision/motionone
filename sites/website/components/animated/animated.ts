import * as React from "react"
import { useRef, useContext, useMemo, createElement, forwardRef } from "react"
import type {
  AnimatedProps,
  AnimationContextProps,
  MotionCSSProperties,
  PoseActiveState,
} from "./types"
import { useAnimation } from "./hooks/use-animation"
import { useHover } from "./hooks/use-hover"
import { usePress } from "./hooks/use-press"
import { useExit } from "./hooks/use-exit"
import { useViewport } from "./hooks/use-viewport"
import { convertKeyframesToStyles } from "./utils/keyframes"
import { resolvePose } from "./utils/poses"
import { AnimationContext } from "./context"

export function createAnimatedComponent<Props extends {}>(Component: string) {
  function Animated(
    props: Props & AnimatedProps,
    _externalRef: React.Ref<Element>
  ) {
    // TODO: Support externalRef if provided
    const ref = useRef(null)

    const {
      options: defaultOptions,
      style,
      initial,
      hover,
      press,
      exit,
      inViewport,
      viewport,
      poses,
      onStart,
      onComplete,
      onViewportEnter,
      onViewportLeave,
      inherit = true,
      ...forwardProps
    } = props

    /**
     * Track throughout the render which poses are considered active and should
     * be passed to children.
     */
    const isPoseActive: PoseActiveState = { initial: true, style: true }

    /**
     * Inherit poses from the parent context,
     */
    let inherited = useContext(AnimationContext)
    if (!inherit) inherited = {}

    const resolvedStyle = resolvePose(style, inherited.style, poses)
    const resolvedInitial = resolvePose(
      initial as any,
      inherited.initial,
      poses
    )
    const initialTarget = { ...resolvedStyle, ...resolvedInitial }
    const target = { ...resolvedInitial, ...resolvedStyle }

    const options = { ...defaultOptions, ...resolvedStyle?.options }

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
    const hoverProps = useHover(target, options, props, inherited, isPoseActive)
    const pressProps = usePress(target, options, props, inherited, isPoseActive)
    useViewport(ref, target, options, props, inherited, isPoseActive)
    const onExitComplete = useExit(target, options, props, inherited)

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
        if (typeof props[key] === "string" && isPoseActive[key]) {
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

    return createElement(AnimationContext.Provider, {
      value: memoizedContext,
      children: element,
    } as any)
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
