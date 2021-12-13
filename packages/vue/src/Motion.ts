import {
  inject,
  onMounted,
  onUpdated,
  provide,
  ref,
  defineComponent,
} from "vue"
import { createMotionState, createStyleString } from "@motionone/dom"

const contextId = "motion-state"

const Motion = defineComponent({
  name: "Motion",
  inheritAttrs: true,
  props: {
    as: {
      type: String,
      default: "div",
    },
    initial: {
      type: Object,
    },
    style: {
      type: String,
      default: "",
    },
  },
  setup(props) {
    const root = ref<Element | null>(null)
    const parentState = inject(contextId, undefined)
    const state = createMotionState(props as any, parentState)
    const initialStyle = createStyleString(state.getTarget())

    provide(contextId, state)

    onMounted(() => {
      return root.value && state.mount(root.value)
    })

    onUpdated(() => {
      state.update(props as any)
    })

    return {
      root,
      initialStyle,
    }
  },
  template: `
  <component :is="as" :style="style + initialStyle" ref="root">
    <slot />
  </component>
  `,
})

export default Motion
