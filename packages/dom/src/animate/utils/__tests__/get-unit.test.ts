import { getUnitConverter } from "../get-unit"

describe("getUnit", () => {
  test("Returns unit from value", () => {
    expect(getUnitConverter(["2"])(2)).toEqual(2)
    expect(getUnitConverter(["3.3"])(2)).toEqual(2)
    expect(getUnitConverter(["0.1px"])(2)).toEqual("2px")
    expect(getUnitConverter([".1px"])(2)).toEqual("2px")
    expect(getUnitConverter(["4%"])(2)).toEqual("2%")
    expect(getUnitConverter(["-4.5%"])(0.5)).toEqual("0.5%")
  })
})
