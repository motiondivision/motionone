<template>
  <div class="container">
    <Presence>
      <Motion
        v-show="show"
        :initial="{ opacity: 0, scale: 0 }"
        :animate="{ opacity: 1, scale: 1 }"
        :exit="{ opacity: 0, scale: 0.6 }"
        class="box"
      >
      </Motion>
    </Presence>
    <button @click="show = !show">Toggle</button>
  </div>
</template>

<script>
import { Motion, Presence } from "motion/vue"

export default {
  components: { Motion, Presence },
  data() {
    return { show: true }
  },
}
</script>

<style>
.container {
  width: 100px;
  height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

.container button {
  cursor: pointer;
}
.box {
  width: 100px;
  height: 100px;
  border-radius: 10px;
  background-color: red;
}
</style>
