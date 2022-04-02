import { noopReturn } from "@motionone/utils"
import { interpolate } from "../interpolate"

describe("interpolate", () => {
  test("Interpolates from one set of numbers into another", () => {
    expect(interpolate([0, 100])(0.5)).toEqual(50)
    expect(interpolate([0, 100], [0, 0.5])(-1)).toEqual(0)
    expect(interpolate([0, 100], [0, 0.5])(0.5)).toEqual(100)
    expect(interpolate([0, 100, 0])(0.75)).toEqual(50)
    expect(interpolate([0, 100, 0], [0.5])(0.25)).toEqual(0)
    expect(interpolate([0, 100, 0], [0.5])(0.75)).toEqual(100)
    expect(interpolate([0, 100, 500], [0.5])(2)).toEqual(500)
    expect(interpolate([0, 100, 500], [0.5])(-2)).toEqual(0)
  })

  test("Applies easing", () => {
    expect(interpolate([0, 100, 0], undefined, noopReturn)(0.75)).toEqual(50)
    expect(
      interpolate([0, 100, 0], undefined, [noopReturn, noopReturn])(0.75)
    ).toEqual(50)
    expect(interpolate([0, 100, 0], undefined, () => 0)(0.75)).toEqual(100)
    expect(interpolate([0, 100, 0], undefined, () => 1)(0.75)).toEqual(0)
  })
})
