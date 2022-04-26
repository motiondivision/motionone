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

export function motion(el: Element, props: Accessor<Options>) {
  createMotion(el, props, useContext(PresenceContext))
}
