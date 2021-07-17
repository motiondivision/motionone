import {
  detectCssPropertyType,
  registerCssVariable,
  registeredProperties,
} from "../css-var"

describe("registerCssVariable", () => {
  test("it registers new CSS properties", () => {
    expect(registeredProperties).not.toContain("--motion-x")
    registerCssVariable("--motion-x")
    expect(registeredProperties).toContain("--motion-x")
  })
})

describe("detectCssPropertyType", () => {
  test("it correctly detects the type of a CSS property", () => {
    expect(detectCssPropertyType()).toEqual({})

    // Number
    expect(detectCssPropertyType(1)).toEqual({
      syntax: "<number>",
      initialValue: 0,
    })

    // Color
    const color = {
      syntax: "<color>",
      initialValue: "#000",
    }
    expect(detectCssPropertyType("#fff")).toEqual(color)
    expect(detectCssPropertyType("#fff00000")).toEqual(color)
    expect(detectCssPropertyType("rgba(255, 255, 255, 1)")).toEqual(color)
    expect(detectCssPropertyType("hsla(180deg, 10, 10)")).toEqual(color)

    // Length
    expect(detectCssPropertyType("100px")).toEqual({
      syntax: "<length-percentage>",
      initialValue: "0px",
    })
    expect(detectCssPropertyType("100%")).toEqual({
      syntax: "<length-percentage>",
      initialValue: "0px",
    })

    // Rotation
    expect(detectCssPropertyType("180deg")).toEqual({
      syntax: "<angle>",
      initialValue: "0deg",
    })
  })
})
