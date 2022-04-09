import { createSignal } from "solid-js"
import { Motion } from "../../../../../packages/solid/src/index"

export default function AnimatePropChange() {
  const [isSelected, setSelected] = createSignal(true)
  return (
    <Motion.Div
      onClick={() => setSelected(!isSelected())}
      initial={{ opacity: 0.6 }}
      animate={{
        opacity: isSelected() ? 1 : 0.1,
        x: isSelected() ? 0 : 50,
        transition: { duration: 1 },
      }}
      transition={{ duration: 1 }}
      style={{ width: "200px", "background-color": "red", height: "200px" }}
    />
  )
}
