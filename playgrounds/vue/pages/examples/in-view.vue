<template>
  <div class="in-view-container">
    <Motion
      class="in-view-box"
      :initial="{ opacity: 0, y: 50 }"
      :in-view="{ opacity: 1, y: 0 }"
      :hover="{ scale: 1.2, backgroundColor: `#00ffdb`, rotate: 90 }"
      :press="{ scale: 0.9 }"
      :transition="{
        duration: 1,
        easing: [0.7, -0.46, 0.24, 1.31],
      }"
      style="background-color: #fff208"
    >
    </Motion>
    <Motion
      class="in-view-box"
      :initial="{ opacity: 0, y: 50 }"
      :in-view="{ opacity: 1, y: 0 }"
      :hover="{ scale: 1.2, backgroundColor: `#00ffdb`, rotate: 90 }"
      :press="{ scale: 0.9 }"
      :transition="{
        duration: 1,
        easing: [0.7, -0.46, 0.24, 1.31],
      }"
      style="background-color: #fff208"
    >
    </Motion>
    <Motion
      class="in-view-box"
      :initial="{ opacity: 0, y: 50 }"
      :in-view="{ opacity: 1, y: 0 }"
      :view="{ margin: `-100px` }"
      :hover="{ scale: 1.2, backgroundColor: `#00ffdb`, rotate: 90 }"
      :press="{ scale: 0.9 }"
      :transition="{
        duration: 1,
        easing: [0.7, -0.46, 0.24, 1.31],
      }"
      style="background-color: #fff208"
    >
    </Motion>
    <Motion
      class="in-view-box"
      :initial="{ opacity: 0, y: 50 }"
      :in-view="{ opacity: 1, y: 0 }"
      :hover="{ scale: 1.2, backgroundColor: `#00ffdb`, rotate: 90 }"
      :press="{ scale: 0.9 }"
      :transition="{
        duration: 1,
        easing: [0.7, -0.46, 0.24, 1.31],
      }"
      style="background-color: #fff208"
    >
    </Motion>
  </div>
</template>

<style global>
body {
  margin: 0;
  padding: 0;
}
</style>

<style>
.in-view-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 300px;
  background: #0f1115;
  flex-direction: column;
}

.in-view-box {
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
