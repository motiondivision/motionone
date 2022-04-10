import { createSignal, Show } from "solid-js"
import { Motion, Presence } from "../../../../../packages/solid/src"

import "./presence.css"

export default function PresenceInitial() {
  const [toggle, setToggle] = createSignal(true)

  return (
    <div class="container">
      <Presence>
        <Show
          when={toggle()}
          fallback={
            <Motion
              class="box"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              style={{
                "background-color": "blue",
              }}
            />
          }
        >
          <Motion
            class="box"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
          />
        </Show>
      </Presence>
      <button onClick={() => setToggle(!toggle())}>
        {toggle() ? "Hide" : "Show"}
      </button>
    </div>
  )
}
