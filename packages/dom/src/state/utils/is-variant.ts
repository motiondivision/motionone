import { Variant, VariantDefinition } from "../types"

export function isVariant(
  definition: VariantDefinition | undefined
): definition is Variant {
  return typeof definition === "object"
}
