<template>
  <Motion
    :initial="{ opacity: 0 }"
    :animate="{ opacity: 1 }"
    :hover="{ scale: 1.2 }"
    :press="{ scale: 0.9 }"
    :inView="{ backgroundColor: 'black' }"
    :transition="{ duration: 1 }"
    style="width: 200px; background-color: red; height: 200px"
  >
  </Motion>
</template>

<script lang="ts">
import { animate, spring } from "motion"
import { Motion } from "@motionone/vue"

export default {
  components: {
    Motion,
  },
  setup() {
    onMounted(() => {
      setTimeout(() => {
        const animation = animate((p) => console.log("p", p), {
          easing: spring({ stiffness: 300, damping: 10 }),
        })
      }, 3000)
    })
  },
}
</script>
