<template>
  <div style="display: flex">
    <div
      ref="a"
      style="width: 200px; background-color: red; height: 200px"
    ></div>
    <div
      ref="b"
      data-motion-id="Box"
      style="width: 200px; background-color: green; height: 200px"
    ></div>
    <div
      ref="c"
      id="c"
      style="width: 200px; background-color: blue; height: 200px"
    ></div>
    <div
      ref="d"
      id="d"
      style="width: 200px; background-color: yellow; height: 200px"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue"
import { gsap } from "gsap"

const a = ref(null)
const b = ref(null)
const c = ref(null)
const d = ref(null)

onMounted(() => {
  if ((window as any).__MOTION_DEV_TOOLS) {
    ;(window as any).__MOTION_DEV_TOOLS.getState().registerGSAP(gsap)
  }

  gsap.to(a.value, { y: 200, scale: 2, duration: 3 })
  gsap.from(b.value, { y: 200, scale: 2, duration: 3 })
  // gsap.to(b.value, { scale: [0, 1], duration: 3 })

  const tl = gsap.timeline({ repeat: 1 })
  tl.to("#d", { rotate: 90, duration: 1 })
  tl.to("#c", { rotate: 90 })
  // tl.play()

  gsap.to("div", { opacity: 0.4, duration: 3 })
})
</script>
