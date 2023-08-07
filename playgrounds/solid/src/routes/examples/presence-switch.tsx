import { createSignal, Switch, Match } from "solid-js"
// import { Motion, Presence } from "@motionone/solid"
import { Motion, Presence } from "../../../../../packages/solid/src"

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
      <Presence initial={false} exitBeforeEnter>
        <Switch>
          <Match when={show() === 1}>
            <Motion.div class="box 1" {...options} transition={{ duration: 1 }}>
              1
            </Motion.div>
          </Match>
          <Match when={show() === 2}>
            <Motion.div
              class="box 2"
              style={{
                "background-color": "blue",
              }}
              {...options}
            >
              <Motion.span initial={{ rotate: 360 }} animate={{ rotate: 0 }}>
                2
              </Motion.span>
            </Motion.div>
          </Match>
          <Match when={show() === 0}>
            <Motion.div
              class="box 0"
              style={{
                "background-color": "green",
              }}
              {...options}
            >
              0
            </Motion.div>
          </Match>
        </Switch>
      </Presence>
    </div>
  )
}
