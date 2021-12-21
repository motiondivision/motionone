import {
  h,
  inject,
  onMounted,
  onUpdated,
  provide,
  ref,
  defineComponent,
} from "vue"
import { createMotionState, createStyles } from "@motionone/dom"

const contextId = "motion-state"

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
    const state = createMotionState({ ...props }, parentState)

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
    }
  },
  render() {
    return h(
      this.tag,
      {
        ref: "root",
        /**
         * If this is the initial render, incorporate animated values so we
         * support SSR. For subsequent renders just forward style.
         */
        style: !this.state.isMounted()
          ? { ...this.style, ...createStyles(this.state.getTarget()) }
          : this.style,
      },
      this.$slots.default?.()
    )
  },
})
