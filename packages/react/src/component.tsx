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
import type { ElementProps, MotionEventHandlers } from "./types"
import { MotionContext } from "./context"
import { useEvents } from "./utils/events"

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
      onMotionStart,
      onMotionComplete,
      onHoverStart,
      onHoverEnd,
      onPressStart,
      onPressEnd,
      onViewEnter,
      onViewLeave,
      ...props
    }: Options & Props & MotionEventHandlers,
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
    }

    const state = createMotionState(options, useContext(MotionContext))

    const initialStyle = useMemo(() => createStyles(state.getTarget()), [])

    const ref =
      (externalRef as MutableRefObject<Element>) || useRef<Element>(null)

    useEffect(() => state.mount(ref.current), [])
    useEffect(() => state.update(options))

    useEvents(ref, {
      onMotionStart,
      onMotionComplete,
      onHoverStart,
      onHoverEnd,
      onPressStart,
      onPressEnd,
      onViewEnter,
      onViewLeave,
    })

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
