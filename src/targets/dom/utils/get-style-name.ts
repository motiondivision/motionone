import { asTransformCssVar, isTransform, transformAlias } from "./transforms"

export function getStyleName(key: string): string {
  if (transformAlias[key]) key = transformAlias[key]
  return isTransform(key) ? asTransformCssVar(key) : key
}
