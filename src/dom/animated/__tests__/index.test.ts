import { style } from "../../style"
import { pose } from "../index"
import "../../__tests__/web-animations.min-edited.js"

describe("pose()", () => {
  test("Types are correct", () => {
    const element = document.createElement("div")
    pose(element, {
      hover: "enlarge",
      enlarge: { scale: 2 },
    })
  })

  test("Animate to `style` on mount", async () => {
    const element = document.createElement("div")

    expect(style.get(element, "scale")).toBe(1)

    await new Promise<void>((resolve) => {
      pose(element, { style: { scale: 2 } })
      element.addEventListener("posecomplete", () => resolve())
    })

    expect(style.get(element, "scale")).toBe("2")
    expect(element).toHaveStyle("transform: scale(var(--motion-scale))")
  })

  test("Default options are used for animation", async () => {
    const element = document.createElement("div")

    const promise = new Promise((resolve, reject) => {
      pose(element, { style: { opacity: 0.5 } }, { duration: 0.1 })
      element.addEventListener("posecomplete", () => resolve(true))

      setTimeout(reject, 200)
    })

    await expect(promise).resolves.toBe(true)
    expect(element).toHaveStyle("opacity: 0.5")
  })

  test("posestart fires", async () => {
    const element = document.createElement("div")

    const promise = new Promise((resolve, reject) => {
      element.addEventListener("posestart", ({ detail }) =>
        resolve(detail.target)
      )
      pose(element, { style: { opacity: 0.5 } }, { duration: 0.1 })

      setTimeout(reject, 200)
    })

    await expect(promise).resolves.toEqual({ opacity: 0.5 })
  })

  test("Pose can accept options override", async () => {
    const element = document.createElement("div")

    expect(style.get(element, "scale")).toBe(1)

    const promise = new Promise((resolve, reject) => {
      pose(
        element,
        { style: { opacity: 1, options: { duration: 0.1 } } },
        { duration: 1 }
      )
      element.addEventListener("posecomplete", () => resolve(true))
      setTimeout(reject, 500)
    })

    expect(promise).resolves
  })

  test("New poses trigger animations if different", async () => {
    const element = document.createElement("div")

    await new Promise((resolve) => {
      pose(element, { style: { opacity: 1 } })
      pose(element, { style: { opacity: 0.5 } }, { duration: 0.01 })
      element.addEventListener("posecomplete", () => resolve(true))
    })

    expect(element).toHaveStyle("opacity: 0.5")
  })

  test("New poses don't trigger animations if the same", async () => {
    const element = document.createElement("div")

    const promise = new Promise((resolve, reject) => {
      pose(element, { style: { opacity: 1 } })
      pose(element, { style: { opacity: 1 } }, { duration: 0.01 })
      element.addEventListener("posecomplete", reject)
      setTimeout(() => resolve(true), 100)
    })

    expect(promise).resolves.toEqual(true)
  })

  test("If value is removed from active pose, animate to initial base target", async () => {
    const element = document.createElement("div")
    element.style.opacity = "0.5"

    await new Promise<void>((resolve, reject) => {
      pose(element, { style: { opacity: 1, scale: 2 } }, { duration: 0.01 })

      function nextAnimation() {
        element.removeEventListener("posecomplete", nextAnimation)
        element.addEventListener("posecomplete", () => resolve())
        expect(element).toHaveStyle("opacity: 1; --motion-scale: 2")
        pose(element, {}, { duration: 0.01 })
      }

      element.addEventListener("posecomplete", nextAnimation)

      setTimeout(reject, 200)
    })

    expect(element).toHaveStyle("opacity: 0.5; --motion-scale: 1")
  })
})
