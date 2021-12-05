import { pose } from ".."
import { pointerEnter, pointerLeave } from "../../../../jest.setup"
import "../../__tests__/web-animations.min-edited.js"

describe("hover", () => {
  test("Animate to hover when hover starts", async () => {
    const element = document.createElement("div")

    await new Promise((resolve) => {
      element.addEventListener("posecomplete", resolve)
      pose(element, { hover: { opacity: 0.5 } }, { duration: 0.01 })

      pointerEnter(element)
    })

    expect(element).toHaveStyle("opacity: 0.5")
  })

  test("Hover doesn't accept touch events", async () => {
    const element = document.createElement("div")

    const promise = new Promise((resolve, reject) => {
      element.addEventListener("posecomplete", resolve)
      pose(element, { hover: { opacity: 0.5 } }, { duration: 0.01 })

      pointerEnter(element, "touch")
      setTimeout(() => reject(false), 50)
    })

    expect(promise).rejects.toEqual(false)
  })

  test("Animate to new hover pose while hover is active", async () => {
    const element = document.createElement("div")

    await new Promise((resolve) => {
      pose(element, { hover: { opacity: 0.5 } }, { duration: 0.01 })

      pointerEnter(element)

      requestAnimationFrame(() => {
        pose(element, { hover: { opacity: 0.75 } }, { duration: 0.01 })
        element.addEventListener("posecomplete", resolve)
      })
    })

    expect(element).toHaveStyle("opacity: 0.75")
  })

  test("Hover fires hoverstart event when hover is triggered", async () => {
    const element = document.createElement("div")

    await new Promise((resolve) => {
      element.addEventListener("hoverstart", resolve)
      pose(element, { hover: { opacity: 1 } })
      pointerEnter(element)
    })
  })

  test("Hover fires hoverend event when hover is triggered", async () => {
    const element = document.createElement("div")

    await new Promise((resolve) => {
      element.addEventListener("hoverend", resolve)
      pose(element, { hover: { opacity: 1 } })
      pointerEnter(element)
      pointerLeave(element)
    })
  })

  test("Animate from hover when hover ends", async () => {
    const element = document.createElement("div")
    element.style.opacity = "1"

    await new Promise<void>((resolve) => {
      element.addEventListener("posecomplete", ({ detail }) => {
        if (detail.target.opacity === "1") resolve()
      })

      pose(element, { hover: { opacity: 0.5 } }, { duration: 0.01 })

      pointerEnter(element)
      setTimeout(() => {
        pointerLeave(element)
      }, 50)
    })

    expect(element).toHaveStyle("opacity: 1")
  })
})
