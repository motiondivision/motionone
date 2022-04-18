import { createSignal, Show } from "solid-js"
import { motion, Presence } from "@motionone/solid"
// import { motion } from "../../../../../packages/solid/src"

import "./presence.css"

export default function PresenceInitial() {
  const [toggle, setToggle] = createSignal(true)

  return (
    <div class="container">
      <button onClick={() => setToggle(!toggle())}>
        {toggle() ? "Hide" : "Show"}
      </button>
      <Presence>
        <Show when={toggle()}>
          <motion.div
            class="box"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.6 }}
          />
        </Show>
      </Presence>
    </div>
  )
}
