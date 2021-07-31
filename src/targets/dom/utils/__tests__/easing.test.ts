import {
  convertEasing,
  cubicBezierAsString,
  isCubicBezier,
  isEasingList,
} from "../easing"

describe("cubicBezierAsString", () => {
  test("Converts array to CSS bezier definition", () => {
    expect(cubicBezierAsString([0, 1, 2, 3])).toEqual(
      "cubic-bezier(0, 1, 2, 3)"
    )
  })
})

describe("isCubicBezier", () => {
  test("Detects a bezier array", () => {
    expect(isCubicBezier([0, 1, 2, 3])).toEqual(true)
    expect(isCubicBezier(["steps(5, start)", [0, 1, 2, 3], "linear"])).toEqual(
      false
    )
  })
})

describe("isEasingList", () => {
  test("Detects an easing list", () => {
    expect(isEasingList([0, 1, 2, 3])).toEqual(false)
    expect(isEasingList(["steps(5, start)", [0, 1, 2, 3], "linear"])).toEqual(
      true
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
