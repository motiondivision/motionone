import { $, component$, useSignal } from "@builder.io/qwik"
import { Motion } from "@motionone/qwik"

export default component$(() => {
  const selected = useSignal(true)

  return (
    <Motion.span
      onClick$={$(() => {
        selected.value = !selected.value
      })}
      initial={{ opacity: 0.6 }}
      animate={{
        opacity: selected.value === true ? 1 : 0.1,
        x: selected.value === true ? 0 : 50,
        transition: { duration: 1 },
      }}
      style={{
        width: "200px",
        "background-color": "purple",
        height: "200px",
        display: "flex",
        placeItems: "center",
        placeContent: "center",
      }}
      data-testid="parent"
    >
      <p>Child component</p>
    </Motion.span>
  )
})
