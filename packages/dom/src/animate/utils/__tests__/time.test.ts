import { ms } from "../time"

describe("ms", () => {
  test("Expresses seconds as milliseconds", () => {
    expect(ms(1)).toBe(1000)
  })
})
