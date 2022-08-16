import { createAnimationsFromTimeline, timeline } from ".."
import {
  spring as createSpringGenerator,
  pregenerateKeyframes,
} from "@motionone/generators"
import { spring } from "../../easing/spring"
import { defaultOffset } from "@motionone/utils"
import { stagger } from "../../utils/stagger"

describe("createAnimationsFromTimeline", () => {
  const a = document.createElement("div")
  const b = document.createElement("div")
  const c = document.createElement("div")
  // const d = document.createElement("div")

  test("It creates a single animation", () => {
    const animations = createAnimationsFromTimeline([
      [
        a,
        { opacity: 1 },
        { duration: 1, easing: [0, 1, 2, 3], offset: [0, 1] },
      ],
    ])

    expect(animations.length).toBe(1)
    expect(animations).toEqual([
      [
        a,
        "opacity",
        [null, 1],
        {
          duration: 1,
          easing: [
            [0, 1, 2, 3],
            [0, 1, 2, 3],
          ],
          offset: [0, 1],
        },
      ],
    ])
  })

  test("It creates a single animation with defaults", () => {
    const animations = createAnimationsFromTimeline([
      [a, { opacity: 1 }, { duration: 1 }],
    ])

    expect(animations.length).toBe(1)
    expect(animations).toEqual([
      [
        a,
        "opacity",
        [null, 1],
        { duration: 1, easing: ["ease", "ease"], offset: [0, 1] },
      ],
    ])
  })

  test("It creates a single animation with defaults - 2", () => {
    const animations = createAnimationsFromTimeline([
      [
        a,
        { x: [100, 100, 200, 300] },
        { duration: 0.5, offset: [0, 0.5, 0.7, 1], easing: "linear" },
      ],
    ])

    expect(animations).toEqual([
      [
        a,
        "x",
        [100, 100, 200, 300],
        {
          duration: 0.5,
          easing: ["linear", "linear", "linear", "linear"],
          offset: [0, 0.5, 0.7, 1],
        },
      ],
    ])
  })

  test("It sequences one animation after another", () => {
    const animations = createAnimationsFromTimeline([
      [
        a,
        { x: [100, 200, 300], opacity: 1 },
        { duration: 0.5, easing: "linear" },
      ],
      [b, { y: 500 }, { duration: 0.5 }],
      [a, { x: 400 }, { duration: 1 }],
    ])

    expect(animations).toEqual([
      [
        a,
        "x",
        [100, 200, 300, null, 400],
        {
          duration: 2,
          easing: ["linear", "linear", "linear", "ease", "ease"],
          offset: [0, 0.125, 0.25, 0.5, 1],
        },
      ],
      [
        a,
        "opacity",
        [null, 1, null],
        {
          duration: 2,
          easing: ["linear", "linear"],
          offset: [0, 0.25, 1],
        },
      ],
      [
        b,
        "y",
        [null, null, 500, null],
        {
          duration: 2,
          easing: ["linear", "ease", "ease"],
          offset: [0, 0.25, 0.5, 1],
        },
      ],
    ])
  })

  test("It adds relative time to another animation", () => {
    const animations = createAnimationsFromTimeline([
      [a, { x: 100 }, { duration: 1 }],
      [b, { y: 500 }, { duration: 0.5, at: "+0.5" }],
    ])

    expect(animations).toEqual([
      [
        a,
        "x",
        [null, 100, null],
        {
          duration: 2,
          easing: ["ease", "ease"],
          offset: [0, 0.5, 1],
        },
      ],
      [
        b,
        "y",
        [null, null, 500],
        {
          duration: 2,
          easing: ["linear", "ease", "ease"],
          offset: [0, 0.75, 1],
        },
      ],
    ])
  })

  test("It adds moves the playhead back to the previous animation", () => {
    const animations = createAnimationsFromTimeline([
      [a, { x: 100 }, { duration: 1 }],
      [b, { y: 500 }, { duration: 0.5, at: "<" }],
    ])

    expect(animations).toEqual([
      [
        a,
        "x",
        [null, 100],
        {
          duration: 1,
          easing: ["ease", "ease"],
          offset: [0, 1],
        },
      ],
      [
        b,
        "y",
        [null, 500, null],
        {
          duration: 1,
          easing: ["ease", "ease"],
          offset: [0, 0.5, 1],
        },
      ],
    ])
  })

  test("It adds subtracts time to another animation", () => {
    const animations = createAnimationsFromTimeline([
      [a, { x: 100 }, { duration: 1 }],
      [b, { y: 500 }, { duration: 0.5, at: "-1" }],
    ])

    expect(animations).toEqual([
      [
        a,
        "x",
        [null, 100],
        {
          duration: 1,
          easing: ["ease", "ease"],
          offset: [0, 1],
        },
      ],
      [
        b,
        "y",
        [null, 500, null],
        {
          duration: 1,
          easing: ["ease", "ease"],
          offset: [0, 0.5, 1],
        },
      ],
    ])
  })

  test("It sets another animation at a specific time", () => {
    const animations = createAnimationsFromTimeline([
      [a, { x: 100 }, { duration: 1 }],
      [b, { y: 500 }, { duration: 0.5, at: 1.5 }],
    ])

    expect(animations).toEqual([
      [
        a,
        "x",
        [null, 100, null],
        {
          duration: 2,
          easing: ["ease", "ease"],
          offset: [0, 0.5, 1],
        },
      ],
      [
        b,
        "y",
        [null, null, 500],
        {
          duration: 2,
          easing: ["linear", "ease", "ease"],
          offset: [0, 0.75, 1],
        },
      ],
    ])
  })

  test("It sets labels from strings", () => {
    const animations = createAnimationsFromTimeline([
      [a, { x: 100 }, { duration: 1 }],
      "my label",
      [a, { opacity: 0 }, { duration: 1 }],
      [b, { y: 500 }, { duration: 1, at: "my label" }],
    ])

    expect(animations).toEqual([
      [
        a,
        "x",
        [null, 100, null],
        {
          duration: 2,
          easing: ["ease", "ease"],
          offset: [0, 0.5, 1],
        },
      ],
      [
        a,
        "opacity",
        [null, null, 0],
        {
          duration: 2,
          easing: ["linear", "ease", "ease"],
          offset: [0, 0.5, 1],
        },
      ],
      [
        b,
        "y",
        [null, null, 500],
        {
          duration: 2,
          easing: ["linear", "ease", "ease"],
          offset: [0, 0.5, 1],
        },
      ],
    ])
  })

  test("It sets annotated labels with absolute at times", () => {
    const animations = createAnimationsFromTimeline([
      [a, { x: 100 }, { duration: 1 }],
      { name: "my label", at: 0 },
      [a, { opacity: 0 }, { duration: 1 }],
      [b, { y: 500 }, { duration: 1, at: "my label" }],
    ])

    expect(animations).toEqual([
      [
        a,
        "x",
        [null, 100, null],
        {
          duration: 2,
          easing: ["ease", "ease"],
          offset: [0, 0.5, 1],
        },
      ],
      [
        a,
        "opacity",
        [null, null, 0],
        {
          duration: 2,
          easing: ["linear", "ease", "ease"],
          offset: [0, 0.5, 1],
        },
      ],
      [
        b,
        "y",
        [null, 500, null],
        {
          duration: 2,
          easing: ["ease", "ease"],
          offset: [0, 0.5, 1],
        },
      ],
    ])
  })

  test("It sets annotated labels with relative at times", () => {
    const animations = createAnimationsFromTimeline([
      [a, { x: 100 }, { duration: 1 }],
      { name: "my label", at: "-1" },
      [a, { opacity: 0 }, { duration: 1 }],
      [b, { y: 500 }, { duration: 1, at: "my label" }],
    ])

    expect(animations).toEqual([
      [
        a,
        "x",
        [null, 100, null],
        {
          duration: 2,
          easing: ["ease", "ease"],
          offset: [0, 0.5, 1],
        },
      ],
      [
        a,
        "opacity",
        [null, null, 0],
        {
          duration: 2,
          easing: ["linear", "ease", "ease"],
          offset: [0, 0.5, 1],
        },
      ],
      [
        b,
        "y",
        [null, 500, null],
        {
          duration: 2,
          easing: ["ease", "ease"],
          offset: [0, 0.5, 1],
        },
      ],
    ])
  })

  test("It advances time by the maximum defined in individual value options", () => {
    const animations = createAnimationsFromTimeline([
      [a, { x: 1, y: 1 }, { duration: 1, y: { duration: 2 } }],
      [b, { y: 1 }, { duration: 0.5 }],
    ])
    expect(animations[0]?.[3]?.duration).toBe(2.5)
    expect(animations[2]?.[3]?.offset?.[1]).toBe(0.8)
  })

  test("It creates multiple animations for multiple targets", () => {
    const animations = createAnimationsFromTimeline([[[a, b, c], { x: 1 }]])

    expect(animations[0][0]).toBe(a)
    expect(animations[1][0]).toBe(b)
    expect(animations[2][0]).toBe(c)
  })

  test("It creates multiple animations, staggered", () => {
    const animations = createAnimationsFromTimeline([
      [[a, b, c], { x: 1 }, { delay: stagger(1), duration: 1 }],
      [a, { opacity: 1 }, { duration: 1 }],
    ])

    expect(animations).toEqual([
      [
        a,
        "x",
        [null, 1, null],
        { duration: 4, easing: ["ease", "ease"], offset: [0, 0.25, 1] },
      ],
      [
        a,
        "opacity",
        [null, null, 1],
        {
          duration: 4,
          easing: ["linear", "ease", "ease"],
          offset: [0, 0.75, 1],
        },
      ],
      [
        b,
        "x",
        [null, null, 1, null],
        {
          duration: 4,
          easing: ["linear", "ease", "ease"],
          offset: [0, 0.25, 0.5, 1],
        },
      ],
      [
        c,
        "x",
        [null, null, 1, null],
        {
          duration: 4,
          easing: ["linear", "ease", "ease"],
          offset: [0, 0.5, 0.75, 1],
        },
      ],
    ])
  })

  test("It scales the whole animation based on the provided duration", () => {
    const animations = createAnimationsFromTimeline(
      [[a, { opacity: 1 }, { duration: 1, easing: ["ease"], offset: [0, 1] }]],
      { duration: 2 }
    )

    expect(animations).toEqual([
      [
        a,
        "opacity",
        [null, 1],
        { duration: 2, easing: ["ease", "ease"], offset: [0, 1] },
      ],
    ])
  })

  test("It passes timeline options to children", () => {
    const animations = createAnimationsFromTimeline(
      [[a, { opacity: 1 }, { duration: 1, easing: ["ease"], offset: [0, 1] }]],
      {
        duration: 2,
        repeat: Infinity,
        direction: "alternate-reverse",
        delay: 1,
        endDelay: 1,
      }
    )

    expect(animations).toEqual([
      [
        a,
        "opacity",
        [null, 1],
        {
          duration: 2,
          repeat: Infinity,
          direction: "alternate-reverse",
          delay: 1,
          endDelay: 1,
          easing: ["ease", "ease"],
          offset: [0, 1],
        },
      ],
    ])
  })

  test("It passes default options to children", () => {
    const animations = createAnimationsFromTimeline(
      [[a, { opacity: 1 }, { offset: [0, 1] }]],
      { defaultOptions: { duration: 2, easing: "ease-in-out" } }
    )

    expect(animations).toEqual([
      [
        a,
        "opacity",
        [null, 1],
        { duration: 2, easing: ["ease-in-out", "ease-in-out"], offset: [0, 1] },
      ],
    ])
  })

  test("It correctly passes easing cubic bezier array to children", () => {
    const animations = createAnimationsFromTimeline(
      [[a, { opacity: 1 }, { offset: [0, 1] }]],
      { defaultOptions: { duration: 2, easing: [0, 1, 2, 3] } }
    )

    expect(animations).toEqual([
      [
        a,
        "opacity",
        [null, 1],
        {
          duration: 2,
          easing: [
            [0, 1, 2, 3],
            [0, 1, 2, 3],
          ],
          offset: [0, 1],
        },
      ],
    ])
  })

  test("It correctly creates keyframes from ease: spring with explicit origin", () => {
    const config = { stiffness: 800, damping: 20 }
    const origin = 50
    const target = 100
    const animations = createAnimationsFromTimeline([
      [a, { x: [origin, target], opacity: [0, 1] }, { easing: spring(config) }],
    ])

    const expectedSpring = createSpringGenerator({
      ...config,
      from: origin,
      to: target,
    })

    const expectedKeyframes = pregenerateKeyframes(
      expectedSpring,
      (value) => value + "px"
    ).keyframes

    animations[0][3]!.offset = animations[0][3]!.offset!.map((v) =>
      parseFloat(v.toFixed(4))
    ) as any

    expect(animations).toEqual([
      [
        a,
        "x",
        expectedKeyframes,
        {
          duration: 0.48,
          easing: defaultOffset(49).fill("linear" as any),
          offset: defaultOffset(49).map((value) =>
            parseFloat(value.toFixed(4))
          ),
        },
      ],
      [
        a,
        "opacity",
        [0, 1, null],
        {
          duration: 0.48,
          easing: ["ease", "ease"],
          offset: [0, 0.16666666666666669, 1],
        },
      ],
    ])
  })

  test("It correctly creates keyframes from ease: spring with explicit origin", () => {
    const config = { stiffness: 800, damping: 20 }
    const origin = "50%"
    const target = "100%"
    const animations = createAnimationsFromTimeline([
      [a, { x: [origin, target], opacity: [0, 1] }, { easing: spring(config) }],
    ])

    const expectedSpring = createSpringGenerator({
      ...config,
      from: parseFloat(origin),
      to: parseFloat(target),
    })

    const expectedKeyframes = pregenerateKeyframes(
      expectedSpring,
      (value) => value + "%"
    ).keyframes

    animations[0][3]!.offset = animations[0][3]!.offset!.map((v) =>
      parseFloat(v.toFixed(4))
    ) as any

    expect(animations).toEqual([
      [
        a,
        "x",
        expectedKeyframes,
        {
          duration: 0.48,
          easing: defaultOffset(49).fill("linear" as any),
          offset: defaultOffset(49).map((value) =>
            parseFloat(value.toFixed(4))
          ),
        },
      ],
      [
        a,
        "opacity",
        [0, 1, null],
        {
          duration: 0.48,
          easing: ["ease", "ease"],
          offset: [0, 0.16666666666666669, 1],
        },
      ],
    ])
  })

  test("It throws when provided a spring with 1 keyframe", () => {
    expect(() =>
      createAnimationsFromTimeline([[a, { x: 100 }, { easing: spring() }]])
    ).toThrow()
  })
})

describe("timeline", () => {
  it("Correctly returns duration as calculated from animations", () => {
    const div = document.createElement("div")
    const controls = timeline([
      [div, { opacity: 0 }, { duration: 1 }],
      [div, { opacity: 1 }, { duration: 2 }],
    ])
    expect(controls.duration).toEqual(3)
  })

  it("Correctly returns duration as defined in options", () => {
    const div = document.createElement("div")
    const controls = timeline(
      [
        [div, { opacity: 0 }, { duration: 1 }],
        [div, { opacity: 1 }, { duration: 2 }],
      ],
      { duration: 1 }
    )
    expect(controls.duration).toEqual(1)
  })
})
