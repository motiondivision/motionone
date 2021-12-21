import { fireEvent } from "@testing-library/dom"
import { pointerDown, pointerEnter, pointerLeave } from "../../../jest.setup"
import "config/waapi-polyfill"
import { createTestMotionState } from "./utils"

/**
 * TODO:
 *  - Press only on single finger
 */

describe("press", () => {
  test("Animate to press when press starts", async () => {
    const { element } = createTestMotionState({
      press: { scale: 0.5 },
      transition: { duration: 0.01 },
    })

    await new Promise((resolve) => {
      element.addEventListener("motioncomplete", resolve)

      pointerDown(element)
    })

    expect(element).toHaveStyle("--motion-scale: 0.5")
  })

  test("Press fires pressstart event when press is triggered", async () => {
    const { element } = createTestMotionState({
      press: { opacity: 1 },
      transition: { duration: 0.01 },
    })

    await new Promise((resolve) => {
      element.addEventListener("pressstart", resolve)
      pointerDown(element)
    })
  })

  test("Press fires pressend event when press is triggered", async () => {
    const { element } = createTestMotionState({
      press: { opacity: 1 },
      transition: { duration: 0.01 },
    })

    await new Promise((resolve) => {
      element.addEventListener("pressend", resolve)
      pointerDown(element)
      fireEvent.pointerUp(window)
    })
  })

  test("Animate to new press pose while press is active", async () => {
    const { element, state } = createTestMotionState({
      press: { opacity: 0.5 },
      transition: { duration: 0.01 },
    })

    await new Promise((resolve) => {
      pointerDown(element)

      requestAnimationFrame(() => {
        state.update({
          press: { opacity: 0.75 },
          transition: { duration: 0.01 },
        })
        element.addEventListener("motioncomplete", resolve)
      })
    })

    expect(element).toHaveStyle("opacity: 0.75")
  })

  test("If hover changes while overridden by press, don't animate", async () => {
    const { element, state } = createTestMotionState({
      hover: { opacity: 0.5 },
      press: { opacity: 0.75 },
      transition: { duration: 0.01 },
    })

    await new Promise<void>((resolve) => {
      pointerEnter(element)

      requestAnimationFrame(() => {
        pointerDown(element)
        state.update({
          hover: { opacity: 0.25 },
          press: { opacity: 0.75 },
          transition: { duration: 0.01 },
        })

        setTimeout(() => {
          resolve()
        }, 100)
      })
    })

    expect(element).toHaveStyle("opacity: 0.75")
  })

  test("Animate from press to hover when press ends", async () => {
    const { element } = createTestMotionState({
      hover: { opacity: 0.5 },
      press: { opacity: 0.75 },
      transition: { duration: 0.01 },
    })

    element.style.opacity = "1"

    await new Promise<void>((resolve) => {
      pointerEnter(element)

      requestAnimationFrame(() => {
        pointerDown(element)

        setTimeout(() => {
          fireEvent.pointerUp(window)
          setTimeout(() => {
            resolve()
          }, 50)
        }, 10)
      })
    })

    expect(element).toHaveStyle("opacity: 0.5")
  })

  test("Animate from press to style when press ends and hover is inactive", async () => {
    const { element } = createTestMotionState({
      hover: { opacity: 0.5 },
      press: { opacity: 0.75 },
      transition: { duration: 0.01 },
    })
    element.style.opacity = "1"

    await new Promise<void>((resolve) => {
      pointerEnter(element)

      requestAnimationFrame(() => {
        pointerDown(element)

        setTimeout(() => {
          pointerLeave(element)
          fireEvent.pointerUp(window)

          setTimeout(() => {
            resolve()
          }, 50)
        }, 10)
      })
    })

    expect(element).toHaveStyle("opacity: 1")
  })
})
