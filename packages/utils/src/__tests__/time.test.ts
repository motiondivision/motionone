import { time } from "../time"

describe("ms", () => {
  test("Expresses seconds as milliseconds", () => {
    expect(time.ms(1)).toBe(1000)
  })
})
