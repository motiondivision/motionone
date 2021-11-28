import * as React from "react"
import { useRef } from "react"
import { motion } from "../"
import {
  // pointerDown,
  // pointerUp,
  // pointerEnter,
  // pointerLeave,
  render,
} from "../../../jest.setup"
import "../../dom/__tests__/web-animations.min-edited"

console.error = jest.fn()

const duration = 0.001

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

  test("Animation runs on mount if initial and animate differ", async () => {
    const element = await new Promise((resolve, reject) => {
      const Component = () => {
        const ref = useRef(null)
        return (
          <motion.div
            ref={ref}
            initial={{ opacity: 0.4 }}
            animate={{ opacity: [0, 0.8] }}
            onAnimationComplete={() => resolve(ref.current)}
            transition={{ duration }}
          />
        )
      }

      const { rerender } = render(<Component />)
      rerender(<Component />)

      setTimeout(() => reject(false), 1000)
    })

    expect(element).toHaveStyle("opacity: 0.8")
  })
})
