<template>
  <Motion
    :initial="{ opacity: 0.6 }"
    :animate="{
      opacity: state.isSelected ? 1 : 0.1,
      x: state.isSelected ? 0 : 50,
      transition: { duration: 1 },
    }"
    :transition="{ duration: 1 }"
    style="width: 200px; background-color: red; height: 200px"
    v-on:click="onClick"
  >
  </Motion>
</template>

<script lang="ts">
import { reactive } from "vue"
import { Motion } from "@motionone/vue"

export default {
  components: {
    Motion,
  },
  setup() {
    const state = reactive({ isSelected: false })
    return {
      state,
      onClick: () => (state.isSelected = !state.isSelected),
    }
  },
}
</script>
