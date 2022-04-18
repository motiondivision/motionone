import { motion } from "@motionone/solid"
// import { motion } from "../../../../../packages/solid/src"

export default function Events() {
  const log = (event) => {
    console.log(event)
  }
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      hover={{ scale: 1.2 }}
      press={{ scale: 0.9 }}
      inView={{ "background-color": "black" }}
      transition={{ duration: 1 }}
      onHoverStart={log}
      onHoverEnd={log}
      onPressStart={log}
      onPressEnd={log}
      onViewEnter={log}
      onViewLeave={log}
      onMotionComplete={log}
      onMotionStart={log}
      style={{ width: "200px", "background-color": "red", height: "200px" }}
    />
  )
}
