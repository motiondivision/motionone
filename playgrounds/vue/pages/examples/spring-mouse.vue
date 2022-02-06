<template>
  <div
    ref="root"
    style="
      width: 100px;
      border-radius: 20px;
      background-color: #ff1231;
      height: 100px;
    "
    @mousedown="startDrag"
  ></div>
</template>

<script lang="ts">
import { animate, spring } from "motion"

export default {
  setup: () => {
    const root = ref<HTMLElement | null>(null)
    let springScheduled = false

    function startSpring(e) {
      springScheduled = false
      animate(
        root.value!,
        { x: e.pageX - 50, y: e.pageY - 50 },
        {
          easing: spring({
            stiffness: 300,
            damping: 10,
          }),
        }
      )
    }

    function handleMove(e) {
      !springScheduled && requestAnimationFrame(() => startSpring(e))
      springScheduled = true
    }

    function stopDrag() {
      window.removeEventListener("mouseup", stopDrag)
      window.removeEventListener("mousemove", handleMove)
    }

    function startDrag(e) {
      window.addEventListener("mousemove", handleMove)
      window.addEventListener("mouseup", stopDrag)
    }

    return { root, startDrag }
  },
}
</script>
