import { createSignal } from "solid-js"
import { Motion } from "../../../../../packages/solid/src/index"
import { Presence } from "../../../../../packages/solid/src/presence"

import "./presence.css"

export default function PresenceInitial() {
  const [toggle, setToggle] = createSignal(false)

  return (
    <div class="container">
      <Presence when={toggle}>
        <Motion
          class="box"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
        />
      </Presence>
      <button onClick={() => setToggle(!toggle())}>
        {toggle() === true ? "Hide" : "Show"}
      </button>
    </div>
  )
}
