import create from "zustand"
import { AnimationsMetadata } from "../../../types"
import { stateFactory } from "../use-editor-state"

const testAnimation: AnimationsMetadata = {
  Animation: {
    currentTime: 0,
    elements: {
      Element: [
        {
          id: "0",
          elementId: "Element",
          animationName: "Animation",
          valueName: "opacity",
          keyframes: {
            "1": {
              id: "1",
              value: "100px",
              offset: 0,
              easing: "ease",
            },
            "2": {
              id: "2",
              value: "200px",
              offset: 0.5,
              easing: "linear",
            },
            "3": {
              id: "3",
              value: "300px",
              offset: 1,
              easing: "ease-out",
            },
          },
          options: {
            delay: 0.5,
            duration: 1,
          },
          source: "motion-one",
        },
      ],
    },
  },
}

describe("state: delete keyframes", () => {
  test("It must delete keyframes", () => {
    const store = create(stateFactory)

    store.getState().addAnimations(testAnimation)
    store.getState().deleteKeyframe({
      id: "2",
      valueId: "0",
      valueName: "opacity",
      elementName: "Element",
    })

    expect(
      store.getState().animations.Animation.elements.Element[0].keyframes
    ).toEqual({
      "1": {
        id: "1",
        value: "100px",
        offset: 0,
        easing: "ease",
      },
      "3": {
        id: "3",
        value: "300px",
        offset: 1,
        easing: "ease-out",
      },
    })
  })

  test("When deleting an end keyframe, it must update duration and offsets", () => {
    const store = create(stateFactory)

    store.getState().addAnimations(testAnimation)
    store.getState().deleteKeyframe({
      id: "3",
      valueId: "0",
      valueName: "opacity",
      elementName: "Element",
    })

    const valueAnimation =
      store.getState().animations.Animation.elements.Element[0]
    expect(valueAnimation.options.delay).toEqual(0.5)
    expect(valueAnimation.options.duration).toEqual(0.5)
    expect(valueAnimation.keyframes).toEqual({
      "1": {
        id: "1",
        value: "100px",
        offset: 0,
        easing: "ease",
      },
      "2": {
        id: "2",
        value: "200px",
        offset: 1,
        easing: "linear",
      },
    })
  })

  test("When deleting the start keyframe, it must update delay, duration and offsets", () => {
    const store = create(stateFactory)

    store.getState().addAnimations(testAnimation)
    store.getState().deleteKeyframe({
      id: "1",
      valueId: "0",
      valueName: "opacity",
      elementName: "Element",
    })

    const valueAnimation =
      store.getState().animations.Animation.elements.Element[0]
    expect(valueAnimation.options.delay).toEqual(1)
    expect(valueAnimation.options.duration).toEqual(0.5)
    expect(valueAnimation.keyframes).toEqual({
      "2": {
        id: "2",
        value: "200px",
        offset: 0,
        easing: "linear",
      },
      "3": {
        id: "3",
        value: "300px",
        offset: 1,
        easing: "ease-out",
      },
    })
  })
})

describe("state: create keyframes", () => {
  test("It must create a keyframe", () => {})
  test("When creating a keyframe at the end of an animation, it must update duration and offsets", () => {})
  test("When creating a keyframe at the start of an animation, it must update delay, duration and offsets", () => {})
})
