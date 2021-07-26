import { MotionKeyframes } from "../../dom/types"
import { Variants } from "../types"

export function resolveVariant(
  definition?: MotionKeyframes | string,
  variants: Variants = {}
): MotionKeyframes | undefined {
  return typeof definition === "string" ? variants[definition] : definition
}
