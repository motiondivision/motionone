import {
  createMotionState,
  createStyles,
  MotionState,
  style,
} from "@motionone/dom"
import { Accessor, createEffect, useContext } from "solid-js"
import {
  defaultPresenceContextState,
  PresenceContext,
  PresenceContextState,
} from "./context"
import { Options } from "./types"

/**
 * createMotion provides MotionOne as a compact Solid primitive.
 * 
 * @param target Target Element to animate.
 * @param options Options to effect the animation.
 * @param presenceState Optional PresenceContext override, defaults to current parent.
 * @returns Object to access MotionState
 */
export function createMotion(
  target: Element,
  options: Options | Accessor<Options>,
  presenceState: PresenceContextState = defaultPresenceContextState
): MotionState {
  const { addCleanup, addMount, initial } = presenceState

  const getOptions = () => (typeof options === "function" ? options() : options)
  const state = createMotionState(
    initial() ? getOptions() : { ...getOptions(), initial: false }
  )

  const styles = createStyles(state.getTarget())
  for (const key in styles) {
    style.set(target, key, styles[key])
  }

  addMount(() => {
    addCleanup(state.mount(target))
    createEffect(() => state.update(getOptions()))
  })

  return state
}

/**
 * motion is a Solid directive that makes binding to elements easier.
 *
 * @param el Target Element to bind to.
 * @param props Options to effect the animation.
 */
export function motion(el: Element, props: Accessor<Options>) {
  createMotion(el, props, useContext(PresenceContext))
}
