import { onMount } from "solid-js"
import { screen, render, fireEvent } from "solid-testing-library"
import { Motion } from "../motion"
import "config/waapi-polyfill"

const duration = 0.001

describe("motion", () => {
  test("renders component", async () => {
    await render(() => (
      <Motion.Div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <Motion.A href="" />
        <Motion.Svg viewBox="" />
      </Motion.Div>
    ))
    expect(true).toBe(true)
  })

  test("Animation runs on mount if initial and animate differ", async () => {
    const element = await new Promise((resolve, reject) => {
      const Component = () => {
        let ref!: HTMLDivElement
        return (
          <Motion.Div
            ref={ref}
            initial={{ opacity: 0.4 }}
            animate={{ opacity: [0, 0.8] }}
            onMotionComplete={() => resolve(ref)}
            transition={{ duration }}
          />
        )
      }
      render(Component)
      setTimeout(() => reject(false), 200)
    })
    expect(element).toHaveStyle("opacity: 0.8")
  })
})
