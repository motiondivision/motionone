<template>
  <div>
    <button v-on:click="toggle">Toggle</button>
    <Presence>
      <Motion
        v-show="state.isSelected"
        :initial="{ opacity: 0 }"
        :animate="{
          opacity: 1,
          x: 100,
          transition: { duration: 1 },
        }"
        :exit="{ opacity: 0, x: 0 }"
        :transition="{ duration: 1 }"
        style="width: 200px; background-color: red; height: 200px"
      >
      </Motion>
    </Presence>
  </div>
</template>

<script lang="ts">
import { reactive } from "vue"
import { Motion, Presence } from "@motionone/vue"

export default {
  components: {
    Motion,
    Presence,
  },
  setup() {
    const state = reactive({ isSelected: true })
    return {
      state,
      toggle: () => (state.isSelected = !state.isSelected),
    }
  },
}
</script>
