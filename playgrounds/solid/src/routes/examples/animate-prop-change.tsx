import { createSignal, onMount } from "solid-js"
import { motion } from "../../../../../packages/solid/src"

export default function AnimatePropChange() {
  const [isSelected, setSelected] = createSignal(true)
  let ref!: HTMLButtonElement
  onMount(() => console.log(ref))
  return (
    <motion.button
      onClick={() => setSelected(!isSelected())}
      initial={{ opacity: 0.6 }}
      animate={{
        opacity: isSelected() ? 1 : 0.1,
        x: isSelected() ? 0 : 50,
        transition: { duration: 1 },
      }}
      transition={{ duration: 1 }}
      style={{ width: "200px", "background-color": "red", height: "200px" }}
      ref={ref}
    />
  )
}
