<template>
  <div class="container">
    <Motion
      class="motion-one-box"
      :initial="{ opacity: 0, y: 50 }"
      :animate="{ opacity: 1, y: 0 }"
      :hover="{ scale: 1.2, backgroundColor: `#00ffdb`, rotate: 90 }"
      :press="{ scale: 0.9 }"
      :transition="{
        duration: 1,
        easing: [0.7, -0.46, 0.24, 1.31],
      }"
      style="background-color: #fff208"
    >
    </Motion>
    <!-- <Motion
      class="motion-one-box"
      :initial="{ opacity: 0, y: 50 }"
      :animate="{ opacity: 1, y: 0 }"
      :hover="{ scale: 1.2, backgroundColor: `red`, rotate: 90 }"
      :press="{ scale: 0.9 }"
      :transition="{
        duration: 1,
        easing: 'steps(3, end)',
        delay: 0,
      }"
      style="background-color: #31a6fa"
    >
    </Motion>
    <Motion
      class="motion-one-box"
      :initial="{ opacity: 0, y: 50 }"
      :animate="{ opacity: 1, y: 0 }"
      :hover="{ scale: 1.2, backgroundColor: `red`, rotate: 90 }"
      :press="{ scale: 0.9 }"
      :transition="{
        duration: 1,
        easing: 'ease-in-out',
      }"
      style="background-color: #ff2965"
    >
    </Motion>
    <Motion
      class="motion-one-box"
      :initial="{ opacity: 0, y: 50 }"
      :animate="{ opacity: 1, y: 0 }"
      :hover="{ scale: 1.2, backgroundColor: `red`, rotate: 90 }"
      :press="{ scale: 0.9 }"
      :transition="{
        duration: 1,
        easing: 'ease-in-out',
      }"
      style="background-color: #57eb64"
    >
    </Motion> -->
  </div>
</template>

<style global>
body {
  margin: 0;
  padding: 0;
}
</style>

<style>
.container {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 50px;
  background: #0f1115;
  flex-direction: row;
}

.motion-one-box {
  border-radius: 20px;
  width: 200px;
  height: 200px;
}
</style>

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
        const animation = animate((p) => {}, {
          easing: spring({ stiffness: 300, damping: 10 }),
        })
      }, 3000)
    })
  },
}
</script>
