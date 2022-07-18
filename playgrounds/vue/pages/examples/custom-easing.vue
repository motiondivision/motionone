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
        easing: () => 0.5,
      }"
      style="background-color: #fff208"
    >
    </Motion>
    <div class="test"></div>
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

<style scoped>
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

.test {
  width: 100px;
  height: 100px;
  background: red;
}
</style>

<script lang="ts">
import { timeline } from "motion"
import { Motion } from "@motionone/vue"

export default {
  components: {
    Motion,
  },
  setup() {
    onMounted(() => {
      // From https://easings.net/#easeOutCirc
      function circOut(x: number): number {
        return Math.sqrt(1 - Math.pow(x - 1, 2))
      }

      // From https://easings.net/#easeOutBounce
      function bounce(x: number): number {
        const n1 = 7.5625
        const d1 = 2.75

        if (x < 1 / d1) {
          return n1 * x * x
        } else if (x < 2 / d1) {
          return n1 * (x -= 1.5 / d1) * x + 0.75
        } else if (x < 2.5 / d1) {
          return n1 * (x -= 2.25 / d1) * x + 0.9375
        } else {
          return n1 * (x -= 2.625 / d1) * x + 0.984375
        }
      }

      timeline(
        [
          [
            ".test",
            { y: -300 },
            { easing: circOut, duration: 0.5, delay: 0.5 },
          ],
          [".test", { y: 0 }, { easing: bounce, duration: 1 }],
        ],
        { repeat: Infinity }
      )
    })
  },
}
</script>
