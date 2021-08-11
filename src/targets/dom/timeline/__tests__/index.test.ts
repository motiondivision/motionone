import { createAnimationsFromTimeline } from "../"

describe("createAnimationsFromTimeline", () => {
  const a = document.createElement("div")
  // const b = document.createElement("div")
  // const c = document.createElement("div")
  // const d = document.createElement("div")

  test("It creates a single animation", () => {
    const animations = createAnimationsFromTimeline([
      [a, { opacity: 1 }, { duration: 1, easing: ["ease"], offset: [0, 1] }],
    ])

    expect(animations.length).toBe(1)
    expect(animations).toEqual([[a, "opacity", [null, 1], { duration: 1 }]])
  })

  test("It sequences one animation after another", () => {})

  test("It adds relative time to another animation", () => {})

  test("It adds subtracts time to another animation", () => {})

  test("It sets another animation at a specific time", () => {})

  test("It sequences animations with multiple keyframes", () => {})

  test("It creates multiple animations for multiple targets", () => {})

  test("It creates multiple animations, staggered", () => {})

  test("It creates multiple animations, staggered, and then sequences another at the correct time", () => {})

  test("It scales the whole animation based on the provided duration", () => {})

  test("It passes default options to children", () => {})

  test("It respects the provided repeat value", () => {})
})
