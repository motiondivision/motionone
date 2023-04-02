import { component$ } from "@builder.io/qwik"
import { Motion } from "@motionone/qwik"

export default component$(() => {
  return (
    <Motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      hover={{ scale: 1.2 }}
      press={{ scale: 0.9 }}
      inView={{ backgroundColor: "black" }}
      style={{ width: "200px", "background-color": "red", height: "200px" }}
      data-testid="box"
    ></Motion.div>
  )
})
