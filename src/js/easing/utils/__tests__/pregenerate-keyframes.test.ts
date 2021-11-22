import { mix } from "../../../../utils/mix"
import { AnimationGenerator, EasingFunction } from "../../../types"
import { hasReachedTarget } from "../has-reached-target"
import { pregenerateKeyframes } from "../pregenerate-keyframes"

const testGenerator = (
  from: number,
  to: number,
  easing: EasingFunction
): AnimationGenerator => {
  return {
    next: (t: number) => {
      const value = mix(from, to, easing(t / 100))
      return {
        value,
        velocity: 100,
        done: t >= 100,
        target: to,
        hasReachedTarget: hasReachedTarget(from, to, value),
      }
    },
  }
}

describe("pregenerateKeyframes", () => {
  test("it should generate keyframes from generator", () => {
    const data = pregenerateKeyframes(testGenerator(0, 100, (v) => v))
    expect(data.keyframes).toEqual([0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100])
    expect(data.duration).toEqual(0.1)
    expect(data.overshootDuration).toEqual(0.1)
  })

  test("it should calculate overshoot when going small -> large", () => {
    const double = pregenerateKeyframes(testGenerator(0, 100, (v) => v * 2))
    expect(double.keyframes).toEqual([
      0,
      20,
      40,
      60,
      80,
      100,
      120,
      140,
      160,
      180,
      100, // Function will correctly stuff with final keyframe
    ])
    expect(double.duration).toEqual(0.1)
    expect(double.overshootDuration).toEqual(0.05)
  })

  test("it should calculate overshoot when going large -> small", () => {
    const double = pregenerateKeyframes(testGenerator(100, 0, (v) => v * 2))
    expect(double.keyframes).toEqual([
      100,
      80,
      60,
      40,
      20,
      0,
      -20,
      -40,
      -60,
      -80,
      0, // Function will correctly stuff with final keyframe
    ])
    expect(double.duration).toEqual(0.1)
    expect(double.overshootDuration).toEqual(0.05)
  })
})
