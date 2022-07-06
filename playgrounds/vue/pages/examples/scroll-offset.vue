<template>
  <main>
    <div class="in-out"></div>
  </main>
</template>

<style scoped>
main {
  --white: #f5f5f5;
  --black: #0f1115;
  --yellow: #ffeb0e;
  --strong-blue: #0d63f8;
  --blue: #31a6fa;
  --green: #57eb64;
  --pink: #ff2965;
  --red: #ff1231;
  --splash: #00ffdb;
  padding-top: 120vh;
  padding-bottom: 120vh;
}
.in-out {
  width: 100px;
  height: 100px;
  background-color: var(--pink);
  border-radius: 20px;
}
</style>

<script lang="ts">
import { animate, scroll } from "motion"

export default {
  setup() {
    onMounted(() => {
      const controls = animate(
        ".in-out",
        { opacity: [0, 1, 1, 0] },
        { easing: "linear", duration: 1 }
      )
      controls.pause()

      scroll(
        ({ y }) => {
          controls.currentTime = y.progress
        },
        {
          target: document.querySelector(".in-out"),
          offset: ["start end", "end end", "start start", "end start"],
        }
      )
    })
  },
}
</script>
