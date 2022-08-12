import { getUnit } from "../get-unit"

describe("getUnit", () => {
  test("Returns unit from value", () => {
    expect(getUnit("2")).toEqual("")
    expect(getUnit("3.3")).toEqual("")
    expect(getUnit("0.1px")).toEqual("px")
    expect(getUnit(".1px")).toEqual("px")
    expect(getUnit("4%")).toEqual("%")
    expect(getUnit("-4.5%")).toEqual("%")
  })
})
