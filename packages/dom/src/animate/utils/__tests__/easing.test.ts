import { convertEasing, cubicBezierAsString } from "../easing"

describe("cubicBezierAsString", () => {
  test("Converts array to CSS bezier definition", () => {
    expect(cubicBezierAsString([0, 1, 2, 3])).toEqual(
      "cubic-bezier(0, 1, 2, 3)"
    )
  })
})

describe("convertEasingList", () => {
  test("Converts bezier array to string", () => {
    expect(
      ["steps(5, start)", [0, 1, 2, 3], "linear"].map(convertEasing as any)
    ).toEqual(["steps(5, start)", "cubic-bezier(0, 1, 2, 3)", "linear"])
  })
})
