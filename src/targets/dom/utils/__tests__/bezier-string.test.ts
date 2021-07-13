import { cubicBezierAsString } from "../easing"

describe("cubicBezierAsString", () => {
  test("Converts array to CSS bezier definition", () => {
    expect(cubicBezierAsString([0, 1, 2, 3])).toEqual(
      "cubic-bezier(0, 1, 2, 3)"
    )
  })
})
