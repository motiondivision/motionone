import { velocityPerSecond } from "@motionone/utils"

const sampleT = 5 // ms
export function calcGeneratorVelocity(
  resolveValue: (v: number) => number,
  t: number,
  current: number
) {
  const prevT = Math.max(t - sampleT, 0)
  return velocityPerSecond(current - resolveValue(prevT), t - prevT)
}
