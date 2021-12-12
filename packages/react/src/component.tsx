import * as React from "react"
import type { ForwardedRef, MutableRefObject } from "react"
import {
  createElement,
  forwardRef,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from "react"
import { createMotionState, createStyles, Options } from "@motionone/dom"
import type { ElementProps } from "./types"
import { MotionContext } from "./context"

export function createMotionComponent<Props extends ElementProps>(
  Component: string
) {
  function Motion(
    {
      initial,
      animate,
      press,
      hover,
      inView,
      variants,
      style,
      transition,
      onAnimationComplete,
      ...props
    }: Options & Props,
    externalRef: ForwardedRef<Element>
  ): JSX.Element {
    const options = {
      initial,
      animate,
      press,
      hover,
      inView,
      variants,
      transition,
      onAnimationComplete,
    }

    const state = createMotionState(options, useContext(MotionContext))

    const initialStyle = useMemo(() => createStyles(state.getTarget()), [])

    const ref =
      (externalRef as MutableRefObject<Element>) || useRef<Element>(null)

    useEffect(() => state.mount(ref.current), [])
    useEffect(() => state.update(options))

    const element = createElement(Component, {
      ...props,
      ref,
      style: { ...style, ...initialStyle },
    })

    return (
      <MotionContext.Provider value={state}>{element}</MotionContext.Provider>
    )
  }

  return forwardRef(Motion)
}
