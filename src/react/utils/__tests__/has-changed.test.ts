import { hasChanged } from "../has-changed"

describe("hasChanged", () => {
  test("Returns true when a value has changed", () => {
    expect(hasChanged(0, 0)).toBe(false)
    expect(hasChanged("1px", "1px")).toBe(false)
    expect(hasChanged([1, 2, 3], [1, 2, 3])).toBe(false)
    expect(hasChanged(1, 0)).toBe(true)
    expect(hasChanged("1px", "2px")).toBe(true)
    expect(hasChanged([1, 2, 4], [1, 2, 3])).toBe(true)
    expect(hasChanged([1, 2, 3, 4], [1, 2, 3])).toBe(true)
    expect(hasChanged([1, 2, 3], [1, 2, 3, 4])).toBe(true)
  })
})
