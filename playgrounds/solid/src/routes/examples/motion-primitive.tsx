import { createSignal, onMount, Show } from "solid-js"
import {
  createMotion,
  Presence,
  motion,
} from "../../../../../packages/solid/src"
// import { Motion } from "@motionone/solid"
motion

export default function MotionPrimitive() {
  let ref1!: HTMLDivElement
  let ref2!: HTMLDivElement

  const [toggle, setToggle] = createSignal(false)

  onMount(() => {
    createMotion(ref1, {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      hover: { scale: 1.2 },
      press: { scale: 0.9 },
      inView: { backgroundColor: "black" },
      transition: { duration: 1 },
    })

    createMotion(ref2, () => ({
      initial: { backgroundColor: "white", scale: 0.6 },
      animate: {
        backgroundColor: "orange",
        scale: 1,
        transition: { delay: 0.4 },
        x: toggle() ? "100px" : "0",
      },
      hover: { scale: 0.6, backgroundColor: "white" },
      transition: { duration: 1 },
    }))
  })

  return (
    <>
      <div
        ref={ref1}
        style={{ width: "200px", "background-color": "red", height: "200px" }}
      >
        <div
          ref={ref2}
          style={{
            width: "100px",
            height: "100px",
          }}
        />
      </div>
      <button onClick={() => setToggle((p) => !p)}>toggle</button>
      <Presence>
        <Show
          when={toggle()}
          fallback={
            <div
              use:motion={{
                initial: { scale: 0.5 },
                animate: { scale: 1 },
                exit: { opacity: 0 },
              }}
              style={{
                width: "100px",
                height: "100px",
                "background-color": "green",
              }}
            />
          }
        >
          <div
            use:motion={{
              initial: { scale: 0.5 },
              animate: { scale: 1 },
              exit: { opacity: 0 },
            }}
            style={{
              width: "100px",
              height: "100px",
              "background-color": "blue",
            }}
          />
        </Show>
      </Presence>
    </>
  )
}
