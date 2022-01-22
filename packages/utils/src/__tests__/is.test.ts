import { isCubicBezier, isEasingList } from "../is"

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
