import { spring as createSpring } from "../"
import { pregenerateKeyframes } from "../../utils/pregenerate-keyframes"
import { createSpringGenerator } from "../generator"

describe("spring", () => {
  test("Single numeric keyframe should return real spring", () => {
    const origin = 50
    const target = 100
    const config = { stiffness: 800, damping: 20 }
    const spring = createSpring(config)
    const animation = spring.createAnimation([target], () => "50px", true)

    const expectedSpring = createSpringGenerator({
      ...config,
      from: origin,
      to: target,
    })

    const expectedKeyframes = pregenerateKeyframes(
      expectedSpring,
      origin,
      target
    ).keyframes

    expect(animation.keyframes).toEqual(expectedKeyframes)
    expect(animation.easing).toEqual("linear")
    expect(animation.duration).toEqual(0.48)
  })

  test("Single numeric keyframe should use default spring is canUseRealSpring is false", () => {
    const target = 100
    const config = { stiffness: 800, damping: 20 }
    const spring = createSpring(config)
    const animation = spring.createAnimation([target], () => "50px", false)

    expect(animation.keyframes).toEqual(undefined)
    expect(animation.easing).toEqual("ease")
  })

  test("[null, number] should return real spring", () => {
    const origin = 50
    const target = 100
    const config = { stiffness: 800, damping: 20 }
    const spring = createSpring(config)
    const animation = spring.createAnimation([null, target], () => "50px", true)

    const expectedSpring = createSpringGenerator({
      ...config,
      from: origin,
      to: target,
    })

    const expectedKeyframes = pregenerateKeyframes(
      expectedSpring,
      origin,
      target
    ).keyframes

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
    const animation = spring.createAnimation([origin, target], readFn, true)

    const expectedSpring = createSpringGenerator({
      ...config,
      from: origin,
      to: target,
    })

    const expectedKeyframes = pregenerateKeyframes(
      expectedSpring,
      origin,
      target
    ).keyframes

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

    const data = {
      activeAnimations: {
        x: { currentTime: 300 },
      },
      activeGenerators: {
        x: existingSpring,
      },
    }

    const origin = 362.59753425757185
    const target = 100
    const config = { stiffness: 800, damping: 20 }
    const spring = createSpring(config)
    const readFn = jest.fn()
    const animation = spring.createAnimation(
      [target],
      readFn,
      true,
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
      origin,
      target
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

    const data = {
      activeAnimations: {
        x: { currentTime: 300 },
      },
      activeGenerators: {
        x: existingSpring,
      },
    }

    const origin = 362.59753425757185
    const target = 100
    const config = { stiffness: 800, damping: 20 }
    const spring = createSpring(config)
    const readFn = jest.fn()
    const animation = spring.createAnimation(
      [null, target],
      readFn,
      true,
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
      origin,
      target
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

    const data = {
      activeAnimations: {
        x: { currentTime: 300 },
      },
      activeGenerators: {
        x: existingSpring,
      },
    }

    const origin = 0
    const target = 100
    const config = { stiffness: 800, damping: 20 }
    const spring = createSpring(config)
    const readFn = jest.fn()

    const animation = spring.createAnimation(
      [origin, target],
      readFn,
      true,
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

    const expectedKeyframes = pregenerateKeyframes(
      expectedSpring,
      origin,
      target
    ).keyframes
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
    const animation = spring.createAnimation(["#fff"], () => "50px", true)

    const expectedSpring = createSpringGenerator({
      ...config,
      from: 0,
      to: 100,
    })

    const keyframesMetadata = pregenerateKeyframes(expectedSpring, 0, 100)

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
    const animation = spring.createAnimation([null, "#fff"], () => "50px", true)

    const expectedSpring = createSpringGenerator({
      ...config,
      from: 0,
      to: 100,
    })

    const keyframesMetadata = pregenerateKeyframes(expectedSpring, 0, 100)

    expect(animation.keyframes).toEqual(undefined)
    expect(animation.easing).toEqual("ease")
    expect(animation.duration).toEqual(keyframesMetadata.overshootDuration)
  })

  test("[string, string] should return spring-linked 'ease' with duration based on default spring overshoot", () => {
    const config = {
      stiffness: 800,
      damping: 20,
    }
    const spring = createSpring(config)
    const animation = spring.createAnimation(
      ["0px", "500px"],
      () => "50px",
      true
    )

    const expectedSpring = createSpringGenerator({
      ...config,
      from: 0,
      to: 100,
    })

    const keyframesMetadata = pregenerateKeyframes(expectedSpring, 0, 100)

    expect(animation.keyframes).toEqual(undefined)
    expect(animation.easing).toEqual("ease")
    expect(animation.duration).toEqual(keyframesMetadata.overshootDuration)
  })

  test("Multiple keyframes should return spring-linked animation", () => {
    const config = {
      stiffness: 800,
      damping: 20,
    }
    const spring = createSpring(config)
    const animation = spring.createAnimation([0, 100, 200], () => "50px", true)

    const expectedSpring = createSpringGenerator({
      ...config,
      from: 0,
      to: 100,
    })

    const keyframesMetadata = pregenerateKeyframes(expectedSpring, 0, 100)

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

    const data = {
      activeAnimations: {
        x: { currentTime: 300 },
      },
      activeGenerators: {
        x: existingSpring,
      },
    }

    const origin = 362.59753425757185
    const target = 100
    const config = { stiffness: 800, damping: 20, velocity: 10000 }
    const spring = createSpring(config)
    const readFn = jest.fn()
    const animation = spring.createAnimation(
      [target],
      readFn,
      true,
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
      origin,
      target
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

    const data = {
      activeAnimations: {
        x: { currentTime: 300 },
      },
      activeGenerators: {
        x: existingSpring,
      },
    }

    const origin = 362.59753425757185
    const target = 100
    const config = { stiffness: 800, damping: 20, velocity: 10000 }
    const spring = createSpring(config)
    const readFn = jest.fn()
    const animation = spring.createAnimation(
      [origin, target],
      readFn,
      true,
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
      origin,
      target
    )
    expect(animation.keyframes).toEqual(expectedKeyframes.keyframes)
    expect(animation.easing).toEqual("linear")
    expect(animation.duration).toEqual(expectedKeyframes.duration)
  })
})
