import { getEasingFunction, getEasingForSegment } from "../easing"
import { cubicBezier, steps } from "@motionone/easing"

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

describe("getEasingForSegment", () => {
  test("Returns correct easing function for the provided index", () => {
    expect(getEasingForSegment("ease", 2)).toEqual("ease")
    expect(getEasingForSegment([0, 1, 2, 3], 2)).toEqual([0, 1, 2, 3])
    expect(getEasingForSegment(["ease", "linear"], 0)).toEqual("ease")
    expect(getEasingForSegment(["ease", "linear"], 1)).toEqual("linear")
    expect(getEasingForSegment(["ease", "linear"], 2)).toEqual("ease")
    expect(getEasingForSegment([[0, 1, 2, 3], "linear"], 2)).toEqual([
      0, 1, 2, 3,
    ])
    expect(getEasingForSegment(["ease", "linear"], 3)).toEqual("linear")
    expect(getEasingForSegment(["ease", "linear", "ease-out"], 2)).toEqual(
      "ease-out"
    )
    expect(getEasingForSegment(["ease", "linear", "ease-out"], 3)).toEqual(
      "ease"
    )
  })
})
