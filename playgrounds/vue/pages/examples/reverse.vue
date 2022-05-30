<template>
  <div
    ref="root"
    style="
      width: 100px;
      border-radius: 20px;
      background-color: #ff1231;
      height: 100px;
    "
  ></div>
  <button @click="toggle">Toggle</button>
</template>

<script lang="ts">
import { animate } from "motion"

export default {
  setup: () => {
    const root = ref<HTMLElement | null>(null)

    let animation

    function toggle() {
      if (!animation) {
        animation = animate(root.value, { scaleY: 0 }, { duration: 1 })
      } else {
        animation.reverse()
      }
    }

    return { root, toggle }
  },
}
</script>
