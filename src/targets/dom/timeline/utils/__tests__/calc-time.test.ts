import { calcNextTime } from "../calc-time"

describe("calcNextTime", () => {
  test("Correctly returns a new time based on the past arguments", () => {
    const labels = new Map()
    labels.set("foo", 2)

    expect(calcNextTime(1, 0.2, labels)).toBe(0.2)
    expect(calcNextTime(2, 0.2, labels)).toBe(0.2)
    expect(calcNextTime(4, "foo", labels)).toBe(2)
    expect(calcNextTime(4, "bar", labels)).toBe(4)
    expect(calcNextTime(5, "-1", labels)).toBe(4)
    expect(calcNextTime(5, "+1", labels)).toBe(6)
  })
})
