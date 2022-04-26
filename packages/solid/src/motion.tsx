import type {
  MotionComponentProps,
  MotionProxy,
  MotionProxyComponent,
} from "./types"
import { Dynamic } from "solid-js/web"
import { useContext, createEffect, splitProps, untrack } from "solid-js"
import { createMotionState, createStyles } from "@motionone/dom"
import { PresenceContext, ParentContext } from "./context"

const MotionComp = (
  props: MotionComponentProps & { tag?: string; ref?: any }
) => {
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

  const { addCleanup, addMount, initial } = useContext(PresenceContext)

  const state = createMotionState(
    initial() ? options : { ...options, initial: false },
    useContext(ParentContext)
  )

  addMount(() => {
    addCleanup(state.mount(root))
    createEffect(() => state.update({ ...options }))
  })

  let root!: Element
  return (
    <ParentContext.Provider value={state}>
      <Dynamic
        ref={(el: Element) => {
          root = el
          props.ref?.(el)
        }}
        component={untrack(() => props.tag || "div")}
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
    </ParentContext.Provider>
  )
}

/**
 * Renders an animatable HTML or SVG element.
 *
 * Animation props:
 * - `animate` a target of values to animate to. Accepts all the same values and keyframes as Motion One's [animate function](https://motion.dev/dom/animate). This prop is **reactive** – changing it will animate the transition element to the new state.
 * - `transition` for changing type of animation
 * - `initial` a target of values to animate from when the element is first rendered.
 * - `exit` a target of values to animate to when the element is removed. The element must be a direct child of the `<Presence>` component.
 *
 * @example
 * ```tsx
 * <Motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}/>
 * ```
 *
 * Interaction animation props:
 *
 * - `inView` animation target for when the element is in view
 * - `hover` animate when hovered
 * - `press` animate when pressed
 *
 * @example
 * ```tsx
 * <Motion.div hover={{ scale: 1.2 }} press={{ scale: 0.9 }}/>
 * ```
 */
export const Motion = new Proxy(MotionComp, {
  get:
    (_, tag: string): MotionProxyComponent<any> =>
    (props) => {
      delete props.tag
      return <MotionComp {...props} tag={tag} />
    },
}) as MotionProxy
