import { addTransformToElement } from "../transforms.js"

describe("addTransformToElement", () => {
  test("correctly adds transforms to transform template", () => {
    const element = document.createElement("div")
    addTransformToElement(element, "translateX")
    expect(element).toHaveStyle(
      "transform: translateX(var(--motion-translateX))"
    )
    addTransformToElement(element, "scale")
    expect(element).toHaveStyle(
      "transform: translateX(var(--motion-translateX)) scale(var(--motion-scale))"
    )
  })
})
