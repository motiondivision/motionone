import {
  h,
  inject,
  onMounted,
  onUpdated,
  provide,
  ref,
  defineComponent,
} from "vue"
import { createMotionState, createStyleString } from "@motionone/dom"
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

    onUpdated(() => {
      state.update({ ...props })
    })

    return {
      state,
      root,
      initialStyles: createStyleString(state.getTarget()),
    }
  },
  render() {
    return h(
      this.tag,
      {
        ref: "root",
        /**
         * We pass this as a style string as Vue doesn't diff
         * individual styles, reapplying them every render.
         *
         * This leads to a known bug where if a value in this.style
         * changes, initial styles may be reapplied.
         */
        style: createStyleString(this.style) + this.initialStyles,
      },
      this.$slots.default?.()
    )
  },
})
