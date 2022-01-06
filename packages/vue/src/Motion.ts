import {
  h,
  inject,
  onMounted,
  onUpdated,
  provide,
  ref,
  defineComponent,
} from "vue"
import { createMotionState, createStyles, style } from "@motionone/dom"
import { contextId, presenceId, PresenceState } from "./context"

const variants = {
  type: Object,
}

export const Motion = defineComponent({
  name: "Motion",
  inheritAttrs: true,
  props: {
    tag: {
      type: String,
      default: "div",
    },
    initial: variants,
    animate: variants,
    inView: variants,
    hover: variants,
    press: variants,
    exit: variants,
    transition: {
      type: Object,
    },
    style: {
      type: Object,
    },
  },
  setup(props) {
    const root = ref<Element | null>(null)
    const parentState = inject(contextId, undefined)
    const presenceState = inject(presenceId, undefined) as
      | PresenceState
      | undefined

    const state = createMotionState(
      {
        ...props,
        initial:
          presenceState?.initial === false
            ? presenceState.initial
            : props.initial,
      },
      parentState
    )

    provide(contextId, state)

    onMounted(() => {
      const unmount = state.mount(root.value!)
      state.update({ ...props })

      return unmount
    })

    let manuallyAppliedMotionStyles = false
    onUpdated(() => {
      /**
       * Vue reapplies all styles every render, rather than diffing and
       * only reapplying the ones that change. This means that initially
       * calculated motion styles also get reapplied every render, leading
       * to incorrect animation origins.
       *
       * To prevent this, once an element is mounted we hand over these
       * styles to Motion. This will currently still lead to a jump if interrupting
       * transforms in browsers where the number polyfill is used.
       */
      if (!manuallyAppliedMotionStyles && root.value) {
        manuallyAppliedMotionStyles = true

        const styles = createStyles(state.getTarget())
        for (const key in styles) {
          style.set(root.value, key, styles[key])
        }
      }

      state.update({ ...props })
    })

    return {
      state,
      root,
      initialStyles: createStyles(state.getTarget()),
    }
  },
  render() {
    return h(
      this.tag,
      {
        ref: "root",
        style: this.state.isMounted()
          ? this.style
          : { ...this.style, ...this.initialStyles },
      },
      this.$slots.default?.()
    )
  },
})
