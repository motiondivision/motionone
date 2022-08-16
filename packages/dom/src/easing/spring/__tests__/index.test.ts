import { spring as createSpring } from "../"
import {
  pregenerateKeyframes,
  spring as createSpringGenerator,
} from "@motionone/generators"
import { MotionValue } from "@motionone/types"

describe("spring", () => {
  test("Single numeric keyframe should return real spring", () => {
    const origin = 50
    const target = 100
    const config = { stiffness: 800, damping: 20 }
    const spring = createSpring(config)
    const animation = spring.createAnimation([target], true, () => "50px")

    const expectedSpring = createSpringGenerator({
      ...config,
      from: origin,
      to: target,
    })

    const expectedKeyframes = pregenerateKeyframes(expectedSpring).keyframes

    expect(animation.keyframes).toEqual(expectedKeyframes)
    expect(animation.easing).toEqual("linear")
    expect(animation.duration).toEqual(0.48)
  })

  test("Single numeric keyframe should use default spring is canUseRealSpring is false", () => {
    const target = 100
    const config = { stiffness: 800, damping: 20 }
    const spring = createSpring(config)
    const animation = spring.createAnimation([target], false, () => "50px")

    expect(animation.keyframes).toEqual(undefined)
    expect(animation.easing).toEqual("ease")
  })

  test("[null, number] should return real spring", () => {
    const origin = 50
    const target = 100
    const config = { stiffness: 800, damping: 20 }
    const spring = createSpring(config)
    const animation = spring.createAnimation([null, target], true, () => "50px")

    const expectedSpring = createSpringGenerator({
      ...config,
      from: origin,
      to: target,
    })

    const expectedKeyframes = pregenerateKeyframes(expectedSpring).keyframes

    expect(animation.keyframes).toEqual(expectedKeyframes)
    expect(animation.easing).toEqual("linear")
    expect(animation.duration).toEqual(0.48)
  })

  test("[number, number] should return real spring", () => {
    const origin = 50
    const target = 100
    const config = { stiffness: 800, damping: 20 }
    const spring = createSpring(config)
    const readFn = jest.fn()
    const animation = spring.createAnimation([origin, target], true, readFn)

    const expectedSpring = createSpringGenerator({
      ...config,
      from: origin,
      to: target,
    })

    const expectedKeyframes = pregenerateKeyframes(expectedSpring).keyframes

    expect(readFn).not.toBeCalled()
    expect(animation.keyframes).toEqual(expectedKeyframes)
    expect(animation.easing).toEqual("linear")
    expect(animation.duration).toEqual(0.48)
  })

  test("Single numeric keyframe should resume existing velocity and not read style from DOM", () => {
    const existingSpring = createSpringGenerator({
      stiffness: 500,
      damping: 5,
      from: 200,
      to: 500,
    })

    const data = new MotionValue()
    data.animation = { currentTime: 300 } as any
    data.generator = existingSpring
    data.generatorStartTime = 0

    const origin = 362.59753425757185
    const target = 100
    const config = { stiffness: 800, damping: 20 }
    const spring = createSpring(config)
    const readFn = jest.fn()
    const animation = spring.createAnimation(
      [target],
      true,
      readFn,
      "x",
      data as any
    )
    expect(readFn).not.toBeCalled()

    const expectedSpring = createSpringGenerator({
      ...config,
      from: origin,
      to: target,
      velocity: 1031.01858338282,
    })

    const expectedKeyframes = pregenerateKeyframes(
      expectedSpring,
      (v) => v + "px"
    ).keyframes
    expect(animation.keyframes).toEqual(expectedKeyframes)
    expect(animation.easing).toEqual("linear")
    expect(animation.duration).toEqual(0.71)
  })

  test("[null, number] should resume existing velocity and not read style from DOM", () => {
    const existingSpring = createSpringGenerator({
      stiffness: 500,
      damping: 5,
      from: 200,
      to: 500,
    })

    const data = new MotionValue()
    data.animation = { currentTime: 300 } as any
    data.generator = existingSpring
    data.generatorStartTime = 0

    const origin = 362.59753425757185
    const target = 100
    const config = { stiffness: 800, damping: 20 }
    const spring = createSpring(config)
    const readFn = jest.fn()
    const animation = spring.createAnimation(
      [null, target],
      true,
      readFn,
      "x",
      data as any
    )
    expect(readFn).not.toBeCalled()

    const expectedSpring = createSpringGenerator({
      ...config,
      from: origin,
      to: target,
      velocity: 1031.01858338282,
    })

    const expectedKeyframes = pregenerateKeyframes(
      expectedSpring,
      (v) => v + "px"
    ).keyframes
    expect(animation.keyframes).toEqual(expectedKeyframes)
    expect(animation.easing).toEqual("linear")
    expect(animation.duration).toEqual(0.71)
  })

  test("[number, number] should *not* resume existing velocity", () => {
    const existingSpring = createSpringGenerator({
      stiffness: 500,
      damping: 5,
      from: 200,
      to: 500,
    })

    const data = new MotionValue()
    data.animation = { currentTime: 300 } as any
    data.generator = existingSpring
    data.generatorStartTime = 0

    const origin = 0
    const target = 100
    const config = { stiffness: 800, damping: 20 }
    const spring = createSpring(config)
    const readFn = jest.fn()

    const animation = spring.createAnimation(
      [origin, target],
      true,
      readFn,
      "x",
      data as any
    )
    expect(readFn).not.toBeCalled()

    const expectedSpring = createSpringGenerator({
      ...config,
      from: origin,
      to: target,
      velocity: 0,
    })

    const expectedKeyframes = pregenerateKeyframes(expectedSpring).keyframes
    expect(animation.keyframes).toEqual(expectedKeyframes)
    expect(animation.easing).toEqual("linear")
    expect(animation.duration).toEqual(0.59)
  })

  test("Single string keyframe should return spring-linked 'ease' with duration based on default spring overshoot", () => {
    const config = {
      stiffness: 800,
      damping: 20,
    }
    const spring = createSpring(config)
    const animation = spring.createAnimation(["#fff"], true, () => "50px")

    const expectedSpring = createSpringGenerator({
      ...config,
      from: 0,
      to: 100,
    })

    const keyframesMetadata = pregenerateKeyframes(
      expectedSpring,
      (v) => v + "px"
    )

    expect(animation.keyframes).toEqual(undefined)
    expect(animation.easing).toEqual("ease")
    expect(animation.duration).toEqual(keyframesMetadata.overshootDuration)
  })

  test("[null, string] should return spring-linked 'ease' with duration based on default spring overshoot", () => {
    const config = {
      stiffness: 800,
      damping: 20,
    }
    const spring = createSpring(config)
    const animation = spring.createAnimation([null, "#fff"], true, () => "50px")

    const expectedSpring = createSpringGenerator({
      ...config,
      from: 0,
      to: 100,
    })

    const keyframesMetadata = pregenerateKeyframes(expectedSpring)

    expect(animation.keyframes).toEqual(undefined)
    expect(animation.easing).toEqual("ease")
    expect(animation.duration).toEqual(keyframesMetadata.overshootDuration)
  })

  test("Can provide custom velocity when velocity should be read", () => {
    const existingSpring = createSpringGenerator({
      stiffness: 500,
      damping: 5,
      from: 200,
      to: 500,
    })

    const data = new MotionValue()
    data.animation = { currentTime: 300 } as any
    data.generator = existingSpring
    data.generatorStartTime = 0

    const origin = 362.59753425757185
    const target = 100
    const config = { stiffness: 800, damping: 20, velocity: 10000 }
    const spring = createSpring(config)
    const readFn = jest.fn()
    const animation = spring.createAnimation(
      [target],
      true,
      readFn,
      "x",
      data as any
    )
    expect(readFn).not.toBeCalled()

    const expectedSpring = createSpringGenerator({
      ...config,
      from: origin,
      to: target,
      velocity: 10000,
    })

    const expectedKeyframes = pregenerateKeyframes(
      expectedSpring,
      (v) => v + "px"
    )
    expect(animation.keyframes).toEqual(expectedKeyframes.keyframes)
    expect(animation.easing).toEqual("linear")
    expect(animation.duration).toEqual(expectedKeyframes.duration)
  })

  test("Can provide custom velocity when velocity should be 0", () => {
    const existingSpring = createSpringGenerator({
      stiffness: 500,
      damping: 5,
      from: 200,
      to: 500,
      velocity: 10000,
    })

    const data = new MotionValue()
    data.animation = { currentTime: 300 } as any
    data.generator = existingSpring
    data.generatorStartTime = 0

    const origin = 362.59753425757185
    const target = 100
    const config = { stiffness: 800, damping: 20, velocity: 10000 }
    const spring = createSpring(config)
    const readFn = jest.fn()
    const animation = spring.createAnimation(
      [origin, target],
      true,
      readFn,
      "x",
      data as any
    )
    expect(readFn).not.toBeCalled()

    const expectedSpring = createSpringGenerator({
      ...config,
      from: origin,
      to: target,
      velocity: 10000,
    })

    const expectedKeyframes = pregenerateKeyframes(
      expectedSpring,
      (v) => v + "px"
    )
    expect(animation.keyframes).toEqual(expectedKeyframes.keyframes)
    expect(animation.easing).toEqual("linear")
    expect(animation.duration).toEqual(expectedKeyframes.duration)
  })
})
