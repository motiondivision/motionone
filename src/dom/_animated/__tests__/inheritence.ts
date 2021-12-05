import { pose } from "../index"
import "../../__tests__/web-animations.min-edited.js"

describe("Pose inheritence", () => {
  test("Child elements inherit poses from parents", async () => {
    const a = document.createElement("div")
    const b = document.createElement("div")
    a.style.opacity = "0"
    b.style.opacity = "0"
    a.appendChild(b)

    pose(a, { style: "visible", visible: { opacity: 1 } }, { duration: 0.02 })
    pose(b, { visible: { opacity: 1 } }, { duration: 0.01 })

    await new Promise((resolve) => a.addEventListener("posecomplete", resolve))

    expect(a).toHaveStyle("opacity: 1")
    expect(b).toHaveStyle("opacity: 1")
  })

  test("Newly-added children are initially set to parent pose", () => {})

  test("Pose names propagate through children", () => {})
})
