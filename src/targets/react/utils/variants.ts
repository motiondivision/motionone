import { MotionKeyframes } from "../../dom/types"
import { Variants } from "../types"

export function resolveVariant(
  definition?: MotionKeyframes | string,
  inheritedDefinition?: string,
  variants: Variants = {}
): MotionKeyframes | undefined {
  if (definition) {
    return typeof definition === "string" ? variants[definition] : definition
  } else if (inheritedDefinition) {
    return variants[inheritedDefinition]
  }
}
