<template>
  <div
    ref="root"
    style="
      width: 100px;
      border-radius: 20px;
      background-color: red;
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

    function handleMove(e) {
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
