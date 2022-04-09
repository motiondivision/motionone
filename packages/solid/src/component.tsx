import type { MotionComponentProps, MotionTagProp } from "./types"
import { Dynamic } from "solid-js/web"
import {
  onMount,
  onCleanup,
  useContext,
  createEffect,
  splitProps,
} from "solid-js"
import { createMotionState, createStyles } from "@motionone/dom"
import { MotionContext } from "./context"

export const Motion = (
  props: MotionComponentProps & { tag: MotionTagProp<any> }
) => {
  const [, attrs] = splitProps(props, [
    "tag",
    "initial",
    "animate",
    "press",
    "hover",
    "inView",
    "variants",
    "style",
    "transition",
    "onMotionStart",
    "onMotionComplete",
    "onHoverStart",
    "onHoverEnd",
    "onPressStart",
    "onPressEnd",
    "onViewEnter",
    "onViewLeave",
  ])

  const state = createMotionState(props, useContext(MotionContext))
  const update = () => {
    state.update({
      ...props,
      animate: props.animate,
      transition: props.transition,
      exit: props.exit,
    })
  }
  createEffect(update)

  onMount(() => {
    onCleanup(state.mount(root))
  })

  let root!: Element
  return (
    <MotionContext.Provider value={state}>
      <Dynamic
        ref={root}
        component={props.tag}
        style={createStyles({ ...props.style, ...state.getTarget() })}
        on:motionstart={props.onMotionStart}
        on:motioncomplete={props.onMotionComplete}
        on:hoverstart={props.onHoverStart}
        on:hoverend={props.onHoverEnd}
        on:pressstart={props.onPressStart}
        on:pressend={props.onPressEnd}
        on:viewenter={props.onViewEnter}
        on:viewleave={props.onViewLeave}
        {...attrs}
      />
    </MotionContext.Provider>
  )
}
