import {
  isTransform,
  transformAlias,
  asTransformCssVar,
} from "./utils/transforms"

export function getValueName(name: string) {
  const valueIsTransform = isTransform(name)
  if (valueIsTransform) {
    if (transformAlias[name]) name = transformAlias[name]
    name = asTransformCssVar(name)
  }
  return name
}
