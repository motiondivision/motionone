import { getEasingFunction } from "../get-function"
import { cubicBezier } from "../cubic-bezier"
import { steps } from "../steps"

const namedEasings = {
  ease: cubicBezier(0.25, 0.1, 0.25, 1.0),
  "ease-in": cubicBezier(0.42, 0.0, 1.0, 1.0),
  "ease-in-out": cubicBezier(0.42, 0.0, 0.58, 1.0),
  "ease-out": cubicBezier(0.0, 0.0, 0.58, 1.0),
}

describe("getEasingFunction", () => {
  test("Correctly returns the correct easing function for the given definition", () => {
    expect(getEasingFunction("ease")(0.5)).toEqual(namedEasings.ease(0.5))
    expect(getEasingFunction("ease-in")(0.5)).toEqual(
      namedEasings["ease-in"](0.5)
    )
    expect(getEasingFunction("ease-in-out")(0.5)).toEqual(
      namedEasings["ease-in-out"](0.5)
    )
    expect(getEasingFunction("ease-out")(0.5)).toEqual(
      namedEasings["ease-out"](0.5)
    )
    expect(getEasingFunction((v: number) => v * 2)(0.5)).toEqual(1)
    expect(getEasingFunction([0.2, 0.0, 0.4, 1.0])(0.5)).toEqual(
      cubicBezier(0.2, 0.0, 0.4, 1.0)(0.5)
    )
    expect(getEasingFunction("steps(2, end)")(0.5)).toEqual(
      steps(2, "end")(0.5)
    )
    expect(getEasingFunction("steps(5, start)")(0.5)).toEqual(
      steps(5, "start")(0.5)
    )
  })
})
