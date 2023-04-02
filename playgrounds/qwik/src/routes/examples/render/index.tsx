import { component$ } from "@builder.io/qwik"
import { Motion } from "@motionone/qwik"

export default component$(() => {
  return (
    <Motion.div
      initial={{ opacity: 0.6 }}
      style={{ width: "200px", "background-color": "red", height: "200px" }}
    />
  )
})
