import { fastInterpolate } from "../interpolate"

describe("fastInterpolate", () => {
  test("It interpolates from a simple number range to simple string range", () => {
    expect(fastInterpolate([0, 1], ["#fff", "#000"])(0.5)).toBe(
      "rgba(180, 180, 180, 1)"
    )
  })
})
