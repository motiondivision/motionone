import { defaultOffset, fillOffset } from "../offset"

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
