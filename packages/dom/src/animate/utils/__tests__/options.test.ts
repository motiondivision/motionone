import { getOptions } from "../options"

describe("getOptions", () => {
  test("Allows options to be overridden on a value-specific basis", () => {
    expect(
      getOptions({ duration: 1, easing: "linear", x: { easing: "ease" } }, "x")
    ).toEqual({ duration: 1, easing: "ease", x: { easing: "ease" } })
    expect(
      getOptions({ duration: 1, opacity: { duration: 0.0001 } }, "opacity")
    ).toEqual({ duration: 0.0001, opacity: { duration: 0.0001 } })
  })
})
