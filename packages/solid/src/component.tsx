import type { MotionComponentProps } from "./types"
import { Dynamic } from "solid-js/web"
import {
  Component,
  onMount,
  onCleanup,
  useContext,
  createComputed,
} from "solid-js"
import { createMotionState, createStyles } from "@motionone/dom"
import { MotionContext } from "./context"

/**
 * Primitive for creating a Motion component
 */
export const createMotionComponent: Component<MotionComponentProps> = (
  props
) => {
  let root: Element
  const state = createMotionState(props, useContext(MotionContext))
  const unwrap = (val: any) => (typeof val === "function" ? val() : val)
  const update = () => {
    state.update({
      ...props,
      animate: unwrap(props.animate),
      transition: unwrap(props.transition),
      exit: unwrap(props.exit),
    })
  }
  ;["animate", "transition", "hover", "press", "inView", "exit"].forEach(
    (key: string) => {
      typeof props[key] === "function" && createComputed(update)
    }
  )
  onMount(() => {
    update()
    onCleanup(state.mount(root))
  })
  return (
    <MotionContext.Provider value={state}>
      <Dynamic
        ref={(ref: Element) => (root = ref)}
        children={props.children}
        component={props.tag || "div"}
        style={createStyles({ ...props.style, ...state.getTarget() })}
        class={props.class}
        onClick={props.onClick}
        on:motionstart={props.onMotionStart}
        on:motioncomplete={props.onMotionComplete}
        on:hoverstart={props.onHoverStart}
        on:hoverend={props.onHoverEnd}
        on:pressstart={props.onPressStart}
        on:pressend={props.onPressEnd}
        on:viewenter={props.onViewEnter}
        on:viewleave={props.onViewLeave}
      />
    </MotionContext.Provider>
  )
}
