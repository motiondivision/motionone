import { noopReturn } from "@motionone/utils"
import {
  convertEasing,
  cubicBezierAsString,
  generateLinearEasingPoints,
} from "../easing"

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

describe("generateLinearEasingPoints", () => {
  test("Converts easing function into string of points", () => {
    expect(generateLinearEasingPoints(noopReturn, 0.16)).toEqual(
      "0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1"
    )
    expect(generateLinearEasingPoints(() => 0.5, 0.2)).toEqual(
      "0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5"
    )
  })
})
