import { velocityPerSecond } from "@motionone/utils"

const sampleT = 10 // ms
export function calcGeneratorVelocity(
  resolveValue: (v: number) => number,
  t: number,
  current: number
) {
  const prevT = Math.max(t - sampleT, 0)
  return velocityPerSecond(current - resolveValue(prevT), 5)
}

export function hasReachedTarget(
  origin: number,
  target: number,
  current: number
) {
  return (
    (origin < target && current >= target) ||
    (origin > target && current <= target)
  )
}
