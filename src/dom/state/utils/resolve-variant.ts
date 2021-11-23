import type { Variant, Variants, VariantDefinition } from "../types"
import { isVariant } from "./is-variant"

export function resolveVariant(
  definition?: VariantDefinition,
  variants?: Variants
): Variant | undefined {
  if (isVariant(definition)) {
    return definition
  } else if (definition && variants) {
    return variants[definition]
  }
}
