<template>
  <Motion as="li"><Motion></Motion></Motion>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import Motion from "../../src/vue/Motion.vue"

export default defineComponent({
  name: "App",
  components: {
    Motion,
  },
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
