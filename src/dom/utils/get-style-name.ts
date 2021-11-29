import { asTransformCssVar, isTransform, transformAlias } from "./transforms.js"

export function getStyleName(key: string): string {
  if (transformAlias[key]) key = transformAlias[key]
  return isTransform(key) ? asTransformCssVar(key) : key
}
