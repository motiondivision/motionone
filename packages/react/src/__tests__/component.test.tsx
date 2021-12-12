import * as React from "react"
import { useRef } from "react"
import { motion } from "../"
import {
  // pointerDown,
  // pointerUp,
  // pointerEnter,
  // pointerLeave,
  render,
} from "../../jest.setup.js"
import "config/waapi-polyfill"

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

      setTimeout(() => reject(false), 100)
    })

    expect(element).toHaveStyle("opacity: 0.8")
  })

  test("Animation doesn't run on mount if initial and animate are the same", async () => {
    const result = await new Promise((resolve, reject) => {
      const Component = () => {
        const animate = { opacity: 0.4 }
        const ref = useRef(null)
        return (
          <motion.div
            ref={ref}
            initial={animate}
            animate={animate}
            onAnimationComplete={() => reject(false)}
            transition={{ duration }}
          />
        )
      }

      const { rerender } = render(<Component />)
      rerender(<Component />)

      setTimeout(() => resolve(true), 100)
    })

    expect(result).toBe(true)
  })

  test("Animation doesn't run in subsequent render if value doesn't change", async () => {
    const result = await new Promise((resolve, reject) => {
      let completeCount = 0
      const Component = () => {
        const animate = { opacity: 0.4 }
        const ref = useRef(null)
        return (
          <motion.div
            ref={ref}
            initial={animate}
            animate={animate}
            onAnimationComplete={() => {
              if (!completeCount) {
                rerender(<Component />)
              } else {
                reject(false)
              }

              completeCount++
            }}
            transition={{ duration }}
          />
        )
      }

      const { rerender } = render(<Component />)
      rerender(<Component />)

      setTimeout(() => resolve(true), 100)
    })

    expect(result).toBe(true)
  })

  test("Animation runs when target changes", async () => {
    const result = await new Promise((resolve) => {
      const Component = ({ animate }: any) => {
        return (
          <motion.div
            data-testid="box"
            initial={{ opacity: 0 }}
            animate={animate}
            onAnimationComplete={(target) => {
              if (target.opacity === 0.8) resolve(true)
            }}
            transition={{ duration }}
          />
        )
      }

      const { rerender } = render(<Component animate={{ opacity: 0.5 }} />)
      rerender(<Component animate={{ opacity: 0.8 }} />)
    })

    expect(result).toBe(true)
  })
})
