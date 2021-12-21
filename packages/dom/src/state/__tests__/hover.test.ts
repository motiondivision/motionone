const { pointerEnter, pointerLeave } = require("config/jest.setup.js")
import { createTestMotionState } from "./utils"
import "config/waapi-polyfill"

describe("hover", () => {
  test("Animate to hover when hover starts", async () => {
    const { element } = createTestMotionState({
      hover: { opacity: 0.5 },
      transition: { duration: 0.01 },
    })

    await new Promise((resolve) => {
      element.addEventListener("motioncomplete", resolve)
      pointerEnter(element)
    })

    expect(element).toHaveStyle("opacity: 0.5")
  })

  test("Hover doesn't accept touch events", async () => {
    const { element } = createTestMotionState({
      hover: { opacity: 0.5 },
      transition: { duration: 0.01 },
    })

    const promise = new Promise((resolve, reject) => {
      element.addEventListener("motioncomplete", resolve)
      pointerEnter(element, "touch")
      setTimeout(() => reject(false), 50)
    })

    expect(promise).rejects.toEqual(false)
  })

  test("Animate to new hover pose while hover is active", async () => {
    const { element, state } = createTestMotionState({
      hover: { opacity: 0.5 },
      transition: { duration: 0.01 },
    })

    await new Promise((resolve) => {
      pointerEnter(element)

      requestAnimationFrame(() => {
        state.update({
          hover: { opacity: 0.75 },
          transition: { duration: 0.01 },
        })
        element.addEventListener("motioncomplete", resolve)
      })
    })

    expect(element).toHaveStyle("opacity: 0.75")
  })

  test("Hover fires hoverstart event when hover is triggered", async () => {
    const { element } = createTestMotionState({
      hover: { opacity: 1 },
      transition: { duration: 0.01 },
    })

    await new Promise((resolve) => {
      element.addEventListener("hoverstart", resolve)
      pointerEnter(element)
    })
  })

  test("Hover fires hoverend event when hover is triggered", async () => {
    const { element } = createTestMotionState({
      hover: { opacity: 1 },
      transition: { duration: 0.01 },
    })

    await new Promise((resolve) => {
      element.addEventListener("hoverend", resolve)
      pointerEnter(element)
      pointerLeave(element)
    })
  })

  test("Animate from hover when hover ends", async () => {
    const { element } = createTestMotionState({
      hover: { opacity: 0.5 },
      transition: { duration: 0.01 },
    })
    element.style.opacity = "1"

    await new Promise<void>((resolve) => {
      element.addEventListener("motioncomplete", ({ detail }: any) => {
        if (detail.target.opacity === "1") resolve()
      })

      pointerEnter(element)
      setTimeout(() => {
        pointerLeave(element)
      }, 50)
    })

    expect(element).toHaveStyle("opacity: 1")
  })
})
