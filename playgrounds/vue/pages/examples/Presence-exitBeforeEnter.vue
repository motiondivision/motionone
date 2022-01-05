<template>
  <div>
    <button v-on:click="next">Next</button>
    <Presence exitBeforeEnter>
      <Motion
        :key="state.current"
        :initial="{ opacity: 0 }"
        :animate="{
          opacity: 1,
          x: 100,
          transition: { duration: 1 },
        }"
        :exit="{ opacity: 0, x: 0 }"
        :transition="{ duration: 1 }"
        style="width: 200px; background-color: red; height: 200px"
        >{{ state.current }}
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
    const state = reactive({ current: 0 })
    return {
      state,
      next: () => (state.current = state.current + 1),
    }
  },
}
</script>
