import { motion } from "framer-motion"
import {
  pointerDown,
  pointerUp,
  pointerEnter,
  pointerLeave,
  render,
} from "../../../jest.setup"
import "../../dom/__tests__/web-animations.min-edited"

describe("motion", () => {
  test("Types are correct", () => {
    render(
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <motion.a href="" />
        <motion.svg viewBox="" />
      </motion.div>
    )

    expect(true).toBe(true)
  })
})
