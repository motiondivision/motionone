<template>
  <Motion
    :initial="{ opacity: 0.6 }"
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
}
</script>
