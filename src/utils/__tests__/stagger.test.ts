import { getFromIndex } from "../stagger"

describe("stagger", () => {
  test("", () => {})
})

describe("getFromIndex", () => {
  test("Returns correct index", () => {
    expect(getFromIndex("first", 9)).toEqual(0)
    expect(getFromIndex("last", 9)).toEqual(8)
    expect(getFromIndex("center", 9)).toEqual(4)
    expect(getFromIndex("center", 10)).toEqual(4.5)
  })
})
