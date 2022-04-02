import type { MotionValue } from "@motionone/types"

export interface ElementAnimationData {
  transforms: string[]
  values: Map<string, MotionValue>
}
