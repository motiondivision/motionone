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
  onCleanup,
  onMount,
  useContext,
} from "solid-js"
import { PresenceContext, PresenceContextState } from "./presence"
import { Options } from "./types"

export const onCompleteExit = (el: Element, fn: VoidFunction) =>
  el.addEventListener("motioncomplete", fn)

/** @internal */
export function createAndBindMotionState(
  el: () => Element,
  options: Accessor<Options>,
  presenceState?: PresenceContextState,
  parentState?: MotionState
) {
  const state = createMotionState(
    presenceState?.() === false ? { ...options(), initial: false } : options(),
    parentState
  )

  onMount(() => {
    const unmount = state.mount(el())
    onCleanup(() => {
      if (presenceState && options().exit) {
        state.setActive("exit", true)
        onCompleteExit(el(), unmount)
      } else unmount()
    })
    isFunction(options) && createEffect(() => state.update(options()))
  })

  return [state, createStyles(state.getTarget())] as const
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
  options: Accessor<Options> | Options,
  presenceState?: PresenceContextState
): MotionState {
  const [state, styles] = createAndBindMotionState(
    () => target,
    typeof options === "function" ? options : () => options,
    presenceState
  )

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
