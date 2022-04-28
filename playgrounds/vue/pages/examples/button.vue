<template>
  <div class="container">
    <Motion
      tag="button"
      data-motion-id="Submit button"
      :initial="false"
      :animate="
        state.isSending
          ? { backgroundColor: `#31a6fa` }
          : { backgroundColor: `#0d63f8` }
      "
      @click="onClick"
    >
      <Motion
        tag="span"
        data-motion-id="Button label"
        :initial="false"
        :animate="
          state.isSending ? { opacity: 0, y: -10 } : { opacity: 1, y: 0 }
        "
        >Submit</Motion
      >
      <Motion
        tag="div"
        class="dots"
        data-motion-id="Dots container"
        :initial="false"
        :animate="
          state.isSending
            ? { opacity: 1, y: 0, transition: { delay: 0.2 } }
            : { opacity: 0, y: 10 }
        "
      >
        <Motion
          tag="div"
          class="dot"
          data-motion-id="Dot 1"
          :animate="
            state.isSending
              ? {
                  y: [7, -7, 7],
                  transition: {
                    repeat: Infinity,
                    duration: 1,
                    easing: [`ease-in-out`, `ease-in-out`],
                  },
                }
              : { y: 0 }
          "
        ></Motion>
        <Motion
          tag="div"
          class="dot"
          data-motion-id="Dot 2"
          :animate="
            state.isSending
              ? {
                  y: [7, -7, 7],
                  transition: {
                    repeat: Infinity,
                    duration: 1,
                    delay: 0.2,
                    easing: [`ease-in-out`, `ease-in-out`],
                  },
                }
              : { y: 0 }
          "
        ></Motion>
        <Motion
          tag="div"
          class="dot"
          data-motion-id="Dot 3"
          :animate="
            state.isSending
              ? {
                  y: [7, -7, 7],
                  transition: {
                    repeat: Infinity,
                    duration: 1,
                    delay: 0.4,
                    easing: [`ease-in-out`, `ease-in-out`],
                  },
                }
              : { y: 0 }
          "
        ></Motion>
      </Motion>
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
.container {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 50px;
  background: #0f1115;
  flex-direction: row;

  --strong-blue: #0d63f8;
  --white: #f5f5f5;

  --button-width: 150px;
}

button {
  border: none;
  border-radius: 40px;
  appearance: none;
  width: var(--button-width);
  height: 50px;
  padding: 10px;
  letter-spacing: -0.3px;
  color: var(--white);
  background: var(--strong-blue);
  position: relative;
}

span {
  display: inline-block;
  position: absolute;
  left: 0;
  width: 100%;
  text-align: center;
  font-size: 18px;
  line-height: 22px;
}

.dots {
  display: flex;
  width: 100%;
  justify-content: center;
  left: calc(50% - calc(var(--button-width) / 2));
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin: 5px;
  background: var(--white);
}
</style>

<script lang="ts">
import { reactive } from "vue"
import { Motion } from "@motionone/vue"

export default {
  components: {
    Motion,
  },
  setup() {
    const state = reactive({ isSending: false })
    return {
      state,
      onClick: () => (state.isSending = !state.isSending),
    }
  },
}
</script>
