import { createTestMotionState } from "./utils"
import "config/waapi-polyfill"
import { getActiveObserver } from "../../gestures/__tests__/mock-intersection-observer"

describe("inView", () => {
  test("Animate to inView when element enters viewport", async () => {
    const { element } = createTestMotionState({
      inView: { backgroundColor: "red" },
      transition: { duration: 0.01 },
    })

    element.style.backgroundColor = "blue"

    expect(element).toHaveStyle("background-color: blue")

    await new Promise<void>((resolve) => {
      expect(getActiveObserver()).toBeTruthy()

      getActiveObserver()?.([{ target: element, isIntersecting: true }])

      setTimeout(resolve, 50)
    })

    expect(element).toHaveStyle("background-color: red")
  })

  test("Element receives viewenter event when inView is enabled", async () => {
    const { element } = createTestMotionState({
      inView: { backgroundColor: "red" },
      transition: { duration: 0.01 },
    })
    const receivedEvent = await new Promise<boolean>((resolve) => {
      element.addEventListener("viewenter", () => resolve(true))
      getActiveObserver()?.([{ target: element, isIntersecting: true }])
    })

    expect(receivedEvent).toEqual(true)
  })

  test("Element receives viewleave event when inView is disabled", async () => {
    const { element } = createTestMotionState({
      inView: { backgroundColor: "red" },
      transition: { duration: 0.01 },
    })

    const receivedEvent = await new Promise<boolean>((resolve) => {
      element.addEventListener("viewleave", () => resolve(true))
      getActiveObserver()?.([{ target: element, isIntersecting: true }])

      setTimeout(() => {
        getActiveObserver()?.([{ target: element, isIntersecting: false }])
      }, 20)
    })

    expect(receivedEvent).toEqual(true)
  })

  test("Animate from inView when element enters viewport", async () => {
    const { element } = createTestMotionState({
      inView: { backgroundColor: "red" },
      transition: { duration: 0.001 },
    })
    element.style.backgroundColor = "blue"

    await new Promise<void>((resolve) => {
      element.addEventListener("motioncomplete", ({ detail }) => {
        if (detail.target.backgroundColor === "red") {
          getActiveObserver()?.([{ target: element, isIntersecting: false }])
        } else if (detail.target.backgroundColor === "blue") {
          resolve()
        }
      })

      expect(getActiveObserver()).toBeTruthy()

      getActiveObserver()?.([{ target: element, isIntersecting: true }])
    })

    expect(element).toHaveStyle("background-color: blue")
  })
})
