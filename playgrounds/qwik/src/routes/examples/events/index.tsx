import { $ } from "@builder.io/qwik"
import { Motion } from "@motionone/qwik"

export default function Events() {
  const log = $((event?: Event) => {
    console.log(event)
  })
  return (
    <Motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      hover={{ scale: 1.2 }}
      press={{ scale: 0.9 }}
      inView={{ backgroundColor: "black" }}
      transition={{ duration: 1 }}
      onHoverStart$={log}
      onHoverEnd$={log}
      onPressStart$={log}
      onPressEnd$={log}
      onViewEnter$={log}
      onViewLeave$={log}
      onMotionComplete$={log}
      onMotionStart$={log}
      style={{ width: "200px", "background-color": "red", height: "200px" }}
    />
  )
}
