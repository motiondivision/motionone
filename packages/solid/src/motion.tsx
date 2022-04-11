import type {
  ElementTag,
  MotionComponent,
  MotionComponentProps,
  MotionProxy,
  MotionProxyComponent,
} from "./types"
import { Dynamic } from "solid-js/web"
import {
  onMount,
  onCleanup,
  useContext,
  createEffect,
  splitProps,
} from "solid-js"
import { createMotionState, createStyles } from "@motionone/dom"
import {
  UnmountContext,
  ParentStateContext,
  OngoingStateContext,
} from "./context"

const MotionComp: MotionComponent = (
  props: MotionComponentProps & { tag?: ElementTag; ref?: any }
) => {
  console.log(props.children)

  const [options, , attrs] = splitProps(
    props,
    [
      "initial",
      "animate",
      "inView",
      "hover",
      "press",
      "variants",
      "transition",
      "exit",
    ],
    [
      "tag",
      "ref",
      "style",
      "onMotionStart",
      "onMotionComplete",
      "onHoverStart",
      "onHoverEnd",
      "onPressStart",
      "onPressEnd",
      "onViewEnter",
      "onViewLeave",
    ]
  )

  const state =
    useContext(OngoingStateContext)?.() ??
    createMotionState(options, useContext(ParentStateContext))

  const { cleanup = onCleanup, mount = onMount } = useContext(UnmountContext)
  mount(() => {
    console.log("mount")

    cleanup(state.mount(root))

    createEffect(() => state.update({ ...options }))
  })

  let root!: Element
  return (
    <ParentStateContext.Provider value={state}>
      <OngoingStateContext.Provider value={undefined}>
        <Dynamic
          ref={(el: Element) => {
            root = el
            props.ref?.(el)
          }}
          component={props.tag || "div"}
          style={{
            ...props.style,
            ...createStyles(state.getTarget()),
          }}
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
      </OngoingStateContext.Provider>
    </ParentStateContext.Provider>
  )
}

export const Motion = new Proxy(MotionComp, {
  get: (_, tag: string): MotionProxyComponent<any> => {
    tag = tag.toLowerCase()
    return (props) => {
      delete props.tag
      return <MotionComp {...props} tag={tag} />
    }
  },
}) as MotionProxy
