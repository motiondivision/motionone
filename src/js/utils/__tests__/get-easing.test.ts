import { getEasingForSegment } from "../get-easing"

describe("getEasingForSegment", () => {
  test("Returns correct easing function for the provided index", () => {
    expect(getEasingForSegment("ease", 2)).toEqual("ease")
    expect(getEasingForSegment([0, 1, 2, 3], 2)).toEqual([0, 1, 2, 3])
    expect(getEasingForSegment(["ease", "linear"], 0)).toEqual("ease")
    expect(getEasingForSegment(["ease", "linear"], 1)).toEqual("linear")
    expect(getEasingForSegment(["ease", "linear"], 2)).toEqual("ease")
    expect(getEasingForSegment([[0, 1, 2, 3], "linear"], 2)).toEqual([
      0,
      1,
      2,
      3,
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
