import {
  createMotionState,
  createStyles,
  MotionState,
  style,
} from "@motionone/dom"
import { isFunction } from "@motionone/utils"
import {
  Accessor,
  createEffect,
  getOwner,
  runWithOwner,
  useContext,
} from "solid-js"
import {
  defaultPresenceContextState,
  PresenceContext,
  PresenceContextState,
} from "./context"
import { Options } from "./types"

/** @internal */
export function createAndBindMotionState(
  target: Accessor<Element>,
  options: Accessor<Options>,
  presenceState: PresenceContextState,
  parentState?: MotionState
): MotionState {
  const { addCleanup, addMount, initial } = presenceState

  const state = createMotionState(
    initial() ? options() : { ...options(), initial: false },
    parentState
  )

  addMount(
    runWithOwner.bind(void 0, getOwner()!, () => {
      addCleanup(state.mount(target()))
      createEffect(() => state.update(options()))
    })
  )

  return state
}

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
  const getOptions = () => (isFunction(options) ? options() : options)

  const state = createAndBindMotionState(
    () => target,
    getOptions,
    presenceState
  )

  const styles = createStyles(state.getTarget())
  for (const key in styles) {
    style.set(target, key, styles[key])
  }

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
