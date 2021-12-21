<template>
  <Motion
    :initial="{ opacity: 0 }"
    :animate="{ opacity: 1 }"
    :hover="{ scale: 1.2 }"
    :press="{ scale: 0.9 }"
    :inView="{ backgroundColor: 'black' }"
    :transition="{ duration: 1 }"
    @hoverstart="log"
    @hoverend="log"
    @pressstart="log"
    @pressend="log"
    @viewenter="log"
    @viewleave="log"
    @motioncomplete="log"
    @motionstart="log"
    style="width: 200px; background-color: red; height: 200px"
  >
  </Motion>
</template>

<script lang="ts">
import { Motion } from "@motionone/vue"

export default {
  components: {
    Motion,
  },
  methods: {
    log(event) {
      console.log(event)
    },
  },
}
</script>
