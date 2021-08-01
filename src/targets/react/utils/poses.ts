import { MotionKeyframesWithOptions, Poses } from "../types"

export function resolvePose(
  definition?: MotionKeyframesWithOptions | string,
  inheritedDefinition?: string,
  poses: Poses = {}
): MotionKeyframesWithOptions | undefined {
  if (definition) {
    return typeof definition === "string" ? poses[definition] : definition
  } else if (inheritedDefinition) {
    return poses[inheritedDefinition]
  }
}
