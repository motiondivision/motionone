import { asTransformCssVar, isTransform, transformAlias } from "./transforms"

export function getStyleName(key: string): string {
  if (transformAlias[key as keyof typeof transformAlias])
    key = transformAlias[key as keyof typeof transformAlias]
  return isTransform(key) ? asTransformCssVar(key) : key
}
