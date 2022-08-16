import { createGeneratorEasing } from "../create-generator-easing"
import { mix, progress } from "@motionone/utils"

const testGenerator = createGeneratorEasing(
  ({ duration, from, to }: any) =>
    (t: number) => ({
      current: mix(from, to, progress(0, duration, t)),
      target: to,
      done: t >= duration,
      hasReachedTarget: t >= duration * 0.5,
    })
)

describe("createGeneratorEasing", () => {
  test("Returns animation settings if shouldGenerate is set to false", () => {
    const generator = testGenerator({ duration: 1000 })
    const { easing, duration, keyframes } = generator.createAnimation(
      [0, 100],
      false
    )
    expect(easing).toEqual("ease")
    expect(duration).toEqual(0.5)
    expect(keyframes).toBeUndefined()
  })

  test("Returns animation settings if values are not numerical", () => {
    const generator = testGenerator({ duration: 1000 })
    const { easing, duration, keyframes } = generator.createAnimation(
      ["rgba(255, 255, 255)", "rgba(0, 0, 0)"],
      false
    )
    expect(easing).toEqual("ease")
    expect(duration).toEqual(0.5)
    expect(keyframes).toBeUndefined()
  })

  test("Returns animation settings if only 1 keyframe is provided and no readInitialValue is provided", () => {
    const generator = testGenerator({ duration: 1000 })
    const { easing, duration, keyframes } = generator.createAnimation(
      [100],
      false
    )
    expect(easing).toEqual("ease")
    expect(duration).toEqual(0.5)
    expect(keyframes).toBeUndefined()
  })

  test("Returns animation settings if first keyframe is null and no readInitialValue is provided", () => {
    const generator = testGenerator({ duration: 1000 })
    const { easing, duration, keyframes } = generator.createAnimation(
      [null, 100],
      false
    )
    expect(easing).toEqual("ease")
    expect(duration).toEqual(0.5)
    expect(keyframes).toBeUndefined()
  })

  test.only("Returns generated keyframes if provided 2 numerical keyframes", () => {
    const generator = testGenerator({ duration: 100 })
    const { easing, duration, keyframes } = generator.createAnimation([50, 100])
    expect(easing).toEqual("linear")
    expect(duration).toEqual(0.1)
    expect(keyframes).toEqual([50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100])
  })
})
