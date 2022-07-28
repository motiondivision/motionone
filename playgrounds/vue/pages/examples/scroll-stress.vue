<template>
  <main>
    <div class="scroll-box"></div>
    <div class="scroll-box"></div>
    <div class="scroll-box"></div>
    <div class="scroll-box"></div>
    <div class="scroll-box"></div>
    <div class="scroll-box"></div>
    <div class="scroll-box"></div>
    <div class="scroll-box"></div>
    <div class="scroll-box"></div>
    <div class="scroll-box"></div>
    <div class="scroll-box"></div>
    <div class="scroll-box"></div>
    <div class="scroll-box"></div>
    <div class="scroll-box"></div>
    <div class="scroll-box"></div>
    <div class="scroll-box"></div>
    <div class="scroll-box"></div>
    <div class="scroll-box"></div>
    <div class="scroll-box"></div>
    <div class="scroll-box"></div>
    <div class="scroll-box"></div>
    <div class="scroll-box"></div>
    <div class="scroll-box"></div>
    <div class="scroll-box"></div>
    <div class="scroll-box"></div>
    <div class="scroll-box"></div>
    <div class="scroll-box"></div>
    <div class="scroll-box"></div>
    <div class="scroll-box"></div>
    <div class="scroll-box"></div>
    <div class="scroll-box"></div>
    <div class="scroll-box"></div>
    <div class="scroll-box"></div>
    <div class="scroll-box"></div>
    <div class="scroll-box"></div>
    <div class="scroll-box"></div>
    <div class="scroll-box"></div>
    <div class="scroll-box"></div>
    <div class="scroll-box"></div>
    <div class="scroll-box"></div>
    <div class="scroll-box"></div>
    <div class="scroll-box"></div>
    <div class="scroll-box"></div>
    <div class="scroll-box"></div>
    <div class="scroll-box"></div>
    <div class="scroll-box"></div>
    <div class="scroll-box"></div>
    <div class="scroll-box"></div>
    <div class="scroll-box"></div>
    <div class="scroll-box"></div>
    <div class="scroll-box"></div>
    <div class="scroll-box"></div>
    <div class="scroll-box"></div>
  </main>
</template>

<style scoped>
body {
  margin: 0;
  padding: 0;
}
main {
  height: 500hv;
  display: flex;
  flex-wrap: wrap;
}

.scroll-box {
  width: 200px;
  height: 200px;
  margin: 50px;
  background: red;
}
</style>

<script lang="ts">
import { animate, scroll } from "motion"

export default {
  setup() {
    onMounted(() => {
      scroll(animate(".scroll-box", { rotate: [0, 360] }))

      // animate((p) => console.log({ p }), { duration: scroll() })

      // animate(".scroll-box", { rotate: [0, 360] }, { duration: scroll })

      // Array.from(document.querySelectorAll(".scroll-box")).forEach((box) => {
      //   const controls = animate(
      //     box,
      //     { rotate: [0, 360] },
      //     { easing: "linear", duration: 1 }
      //   )

      //   controls.pause()
      //   scroll(({ y }) => {
      //     controls.currentTime = controls.duration * y.progress
      //   })
      // })
    })
  },
}
</script>
