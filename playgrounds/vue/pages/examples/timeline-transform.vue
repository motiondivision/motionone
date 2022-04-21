<template>
  <div
    ref="root"
    style="
      width: 100px;
      border-radius: 20px;
      background-color: #ff1231;
      height: 100px;
    "
    @mousedown="reverse"
  ></div>
</template>

<script lang="ts">
import { onMounted } from "vue"
import { timeline } from "motion"

export default {
  setup: () => {
    const root = ref<HTMLElement | null>(null)

    function startSpring() {
      timeline([
        [
          root.value!,
          { x: 400 },
          {
            duration: 2,
          },
        ],
      ])
    }

    onMounted(() => {
      startSpring()
    })

    function reverse(e) {
      timeline([
        [
          root.value!,
          { x: 0 },
          {
            duration: 2,
          },
        ],
      ])
    }

    return { root, reverse }
  },
}
</script>
