import { createSignal, Switch, Match } from "solid-js"
import { motion, Presence } from "../../../../../packages/solid/src"

import "./presence.css"

const options = {
  initial: { opacity: 0, scale: 0 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0 },
}

export default function PresenceInitial() {
  const [show, setShow] = createSignal(1)
  const toggle = () => setShow((p) => (p === 2 ? 0 : ++p))

  return (
    <div class="container">
      <button onClick={toggle}>TOGGLE</button>
      <Presence exitBeforeEnter>
        <Switch>
          <Match when={show() === 1}>
            <motion.div class="box" {...options} transition={{ duration: 1 }}>
              1
            </motion.div>
          </Match>
          <Match when={show() === 2}>
            <motion.div
              class="box"
              style={{
                "background-color": "blue",
              }}
              {...options}
            >
              2
            </motion.div>
          </Match>
        </Switch>
      </Presence>
    </div>
  )
}
