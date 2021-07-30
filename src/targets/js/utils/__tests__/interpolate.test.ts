import { noopReturn } from "../../../../utils/noop"
import {
  defaultOffset,
  fillOffset,
  slowInterpolateNumbers,
} from "../interpolate"

describe("defaultOffset", () => {
  test("Fills an array of length with evenly spaced progress values", () => {
    expect(defaultOffset(1)).toEqual([0])
    expect(defaultOffset(2)).toEqual([0, 1])
    expect(defaultOffset(3)).toEqual([0, 0.5, 1])
    expect(defaultOffset(5)).toEqual([0, 0.25, 0.5, 0.75, 1])
  })
})

describe("fillOffset", () => {
  test("Fills an array from the provided min to 1", () => {
    const a = [0, 0.4]
    fillOffset(a, 1)
    const b = [0, 0.4]
    fillOffset(b, 2)
    const c = [0, 0.4]
    fillOffset(c, 3)

    expect(a).toEqual([0, 0.4, 1])
    expect(b).toEqual([0, 0.4, 0.7, 1])
    expect(c).toEqual([0, 0.4, 0.6, 0.8, 1])
  })
})

describe("slowInterpolateNumbers", () => {
  test("Interpolates from one set of numbers into another", () => {
    expect(slowInterpolateNumbers([0, 100])(0.5)).toEqual(50)
    expect(slowInterpolateNumbers([0, 100], [0, 0.5])(-1)).toEqual(0)
    expect(slowInterpolateNumbers([0, 100], [0, 0.5])(0.5)).toEqual(100)
    expect(slowInterpolateNumbers([0, 100, 0])(0.75)).toEqual(50)
    expect(slowInterpolateNumbers([0, 100, 0], [0.5])(0.25)).toEqual(0)
    expect(slowInterpolateNumbers([0, 100, 0], [0.5])(0.75)).toEqual(100)
    expect(slowInterpolateNumbers([0, 100, 500], [0.5])(2)).toEqual(500)
    expect(slowInterpolateNumbers([0, 100, 500], [0.5])(-2)).toEqual(0)
  })

  test("Applies easing", () => {
    expect(
      slowInterpolateNumbers([0, 100, 0], undefined, noopReturn)(0.75)
    ).toEqual(50)
    expect(
      slowInterpolateNumbers([0, 100, 0], undefined, [noopReturn, noopReturn])(
        0.75
      )
    ).toEqual(50)
    expect(
      slowInterpolateNumbers([0, 100, 0], undefined, () => 0)(0.75)
    ).toEqual(100)
    expect(
      slowInterpolateNumbers([0, 100, 0], undefined, () => 1)(0.75)
    ).toEqual(0)
  })
})
