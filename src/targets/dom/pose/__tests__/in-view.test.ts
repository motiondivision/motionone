import { pose } from ".."
import "../../__tests__/web-animations.min-edited.js"

/**
 * TODO
 *  - viewport options
 *  - listener-only
 */

type MockIntersectionObserverEntry = {
  isIntersecting: boolean
}

type MockIntersectionObserverCallback = (
  entries: MockIntersectionObserverEntry[]
) => void

let activeIntersectionObserver:
  | MockIntersectionObserverCallback
  | undefined = undefined

global.IntersectionObserver = class MockIntersectionObserver {
  callback: MockIntersectionObserverCallback

  constructor(callback: MockIntersectionObserverCallback) {
    this.callback = callback
  }

  observe(_element: Element) {
    activeIntersectionObserver = this.callback
  }

  unobserve(_element: Element) {
    activeIntersectionObserver = undefined
  }

  disconnect() {}
} as any

describe("inView", () => {
  test("Animate to inView when element enters viewport", async () => {
    const element = document.createElement("div")
    element.style.backgroundColor = "blue"

    await new Promise<void>((resolve) => {
      pose(element, { inView: { backgroundColor: "red" } }, { duration: 0.01 })

      expect(activeIntersectionObserver).toBeTruthy()

      activeIntersectionObserver?.([{ isIntersecting: true }])

      setTimeout(resolve, 50)
    })

    expect(element).toHaveStyle("background-color: red")
  })

  test("Element receives viewenter event when inView is enabled", async () => {
    const element = document.createElement("div")

    const receivedEvent = await new Promise<boolean>((resolve) => {
      pose(element, { inView: { backgroundColor: "red" } }, { duration: 0.01 })
      element.addEventListener("viewenter", () => resolve(true))
      activeIntersectionObserver?.([{ isIntersecting: true }])
    })

    expect(receivedEvent).toEqual(true)
  })

  test("Element receives viewleave event when inView is disabled", async () => {
    const element = document.createElement("div")

    const receivedEvent = await new Promise<boolean>((resolve) => {
      pose(element, { inView: { backgroundColor: "red" } }, { duration: 0.01 })
      element.addEventListener("viewleave", () => resolve(true))
      activeIntersectionObserver?.([{ isIntersecting: true }])

      setTimeout(() => {
        activeIntersectionObserver?.([{ isIntersecting: false }])
      }, 20)
    })

    expect(receivedEvent).toEqual(true)
  })

  test("Animate from inView when element enters viewport", async () => {
    const element = document.createElement("div")
    element.style.backgroundColor = "blue"

    await new Promise<void>((resolve) => {
      pose(element, { inView: { backgroundColor: "red" } }, { duration: 0.01 })

      expect(activeIntersectionObserver).toBeTruthy()

      activeIntersectionObserver?.([{ isIntersecting: true }])

      setTimeout(() => {
        activeIntersectionObserver?.([{ isIntersecting: false }])
      }, 20)

      setTimeout(resolve, 50)
    })

    expect(element).toHaveStyle("background-color: blue")
  })
})
