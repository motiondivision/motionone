import { createSignal } from "solid-js"
import { Motion, Presence } from "../../../../../packages/solid/src"

import "./presence.css"

export default function PresenceInitial() {
  const [toggle, setToggle] = createSignal(false)
  return (
    <div class="big_container">
      <Presence when={toggle}>
        <Motion.Div
          class="box"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{ duration: 2 }}
        />
        <Motion.Div
          class="box"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{ duration: 1 }}
        />
      </Presence>
      <button onClick={() => setToggle(!toggle())}>
        {toggle() === true ? "Hide" : "Show"}
      </button>
    </div>
  )
}
