import { ValueSequence } from "../../types"
import { compareByTime } from "../sort"

describe("compareByTime", () => {
  test("Can be used to sort values by at time", () => {
    const sequence: ValueSequence = [
      { value: 0, at: 300, easing: "ease" },
      { value: 1, at: 0, easing: "ease" },
      { value: 2, at: 301, easing: "ease" },
      { value: 3, at: 299, easing: "ease" },
      { value: 4, at: 40, easing: "ease" },
    ]

    expect(sequence.sort(compareByTime)).toEqual([
      { value: 1, at: 0, easing: "ease" },
      { value: 4, at: 40, easing: "ease" },
      { value: 3, at: 299, easing: "ease" },
      { value: 0, at: 300, easing: "ease" },
      { value: 2, at: 301, easing: "ease" },
    ])
  })

  test("Will correctly swap values so null comes second if at time the same", () => {
    const sequence: ValueSequence = [
      { value: null, at: 300, easing: "ease" },
      { value: 1, at: 0, easing: "ease" },
      { value: 2, at: 300, easing: "ease" },
      { value: 3, at: 299, easing: "ease" },
      { value: 4, at: 40, easing: "ease" },
    ]

    expect(sequence.sort(compareByTime)).toEqual([
      { value: 1, at: 0, easing: "ease" },
      { value: 4, at: 40, easing: "ease" },
      { value: 3, at: 299, easing: "ease" },
      { value: 2, at: 300, easing: "ease" },
      { value: null, at: 300, easing: "ease" },
    ])
  })
})
