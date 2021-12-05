<template>
  <component v-bind:is="as"><slot /></component>
</template>

<script lang="ts">
import Vue from "vue"
import { createMotionState } from "../dom/state"
import { MotionState } from "../dom/state/types"

export default Vue.extend<any, any, { state: MotionState }, any>({
  name: "Motion",
  inheritAttrs: true,
  props: {
    as: {
      type: String,
      default: "div",
    },
  },
  computed: {
    state: function () {
      return createMotionState(this.$props, this.parentState)
    },
  },
  provide() {
    return {
      parentMotionState: this.state,
    }
  },
  inject: ["parentMotionState"],
  mounted() {
    this.state.mount(this.$el)
  },
  updated() {
    this.state.update(this.$props)
  },
  destroyed() {},
})
</script>
