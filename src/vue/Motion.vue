<template>
  <component
    v-bind:is="as"
    ref="root"
    style="width: 100px; height: 100px; background-color: green"
    ><slot
  /></component>
</template>

<script lang="ts">
import {
  defineComponent,
  inject,
  onMounted,
  onUpdated,
  provide,
  ref,
} from "vue"
import { createMotionState } from "../dom/state"

const contextId = "motion-state"

export default defineComponent({
  name: "Motion",
  inheritAttrs: true,
  props: {
    as: {
      type: String,
      default: "div",
    },
  },
  setup(props) {
    const root = ref<Element | null>(null)
    const parentState = inject(contextId, undefined)
    const state = createMotionState(props as any, parentState)

    provide(contextId, state)

    onMounted(() => {
      return root.value && state.mount(root.value)
    })

    onUpdated(() => {
      state.update(props as any)
    })
  },
})
</script>
