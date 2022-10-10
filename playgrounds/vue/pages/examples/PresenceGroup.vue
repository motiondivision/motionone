<template>
  <div>
    <button v-on:click="toggle">Toggle</button>
    <PresenceGroup>
      <Motion
        v-for="(item, index) in 5"
        :key="item"
        v-if="state.isSelected"
        :initial="{ opacity: 0 }"
        :animate="{
          opacity: 1,
          x: 100,
          transition: { duration: 1, delay: index * 0.25 },
        }"
        :exit="{ opacity: 0, x: 0 }"
        :transition="{ duration: 1 }"
        style="width: 200px; background-color: red; height: 200px;margin-top: 5px;"
      >
      </Motion>
    </PresenceGroup>
  </div>
</template>

<script lang="ts">
import { reactive } from "vue"
import { Motion, PresenceGroup } from "@motionone/vue"


export default {
  components: {
    Motion,
    PresenceGroup,
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
