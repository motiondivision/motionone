import { defaultOffset, slowInterpolateNumbers } from "../"

describe("defaultOffset", () => {
  test("Creates evenly-spaced offsets", () => {
    expect(defaultOffset([0, 1])).toEqual([0, 1])
    expect(defaultOffset([0, 1, 2])).toEqual([0, 0.5, 1])
    expect(defaultOffset([0, 1, 2, 3])).toEqual([
      0,
      0.3333333333333333,
      0.6666666666666666,
      1,
    ])
  })
})

describe("slowInterpolateNumbers", () => {
  test("interpolates single keyframes elapsed -> duration", () => {
    const interpolate = slowInterpolateNumbers([2, 3], { duration: 2 })
    expect(interpolate(0)).toEqual(2)
    expect(interpolate(1)).toEqual(2.5)
    expect(interpolate(2)).toEqual(3)
    expect(interpolate(3)).toEqual(3)
    expect(interpolate(-1)).toEqual(2)
  })

  test("interpolates multiple keyframes elapsed -> duration", () => {
    const interpolate = slowInterpolateNumbers([0, 2, 4, 6, 8], { duration: 2 })
    expect(interpolate(0)).toEqual(0)
    expect(interpolate(0.25)).toEqual(1)
    expect(interpolate(0.5)).toEqual(2)
    expect(interpolate(0.75)).toEqual(3)
    expect(interpolate(1)).toEqual(4)
    expect(interpolate(1.25)).toEqual(5)
    expect(interpolate(1.5)).toEqual(6)
    expect(interpolate(1.75)).toEqual(7)
    expect(interpolate(2)).toEqual(8)
    expect(interpolate(3)).toEqual(8)
    expect(interpolate(-1)).toEqual(0)
  })

  test.skip("custom offsets", () => {})

  test.skip("custom easing", () => {})
})
