import { createSignal, Show } from "solid-js"
import { motion, Presence } from "@motionone/solid"
// import { motion } from "../../../../../packages/solid/src"

import "./presence.css"

export default function PresenceInitial() {
  const [toggle, setToggle] = createSignal(false)
  return (
    <div class="container">
      <button onClick={() => setToggle(!toggle())}>
        {toggle() === true ? "Hide" : "Show"}
      </button>
      <Presence>
        <Show when={toggle()}>
          <motion.div
            class="box"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <motion.div
              class="box smaller"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ duration: 0.5 }}
            />
          </motion.div>
        </Show>
      </Presence>
    </div>
  )
}
