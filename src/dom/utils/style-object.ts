import type { MotionKeyframes } from "../types"
import { isNumber } from "../../utils/is-number.js"
import {
  asTransformCssVar,
  buildTransformTemplate,
  isTransform,
  transformAlias,
  transformDefinitions,
} from "../../dom/utils/transforms.js"

export function createStyles(keyframes?: MotionKeyframes): any {
  const initialKeyframes: any = {}
  const transformKeys: string[] = []

  for (let key in keyframes) {
    const value = keyframes[key]
    if (isTransform(key)) {
      if (transformAlias[key]) key = transformAlias[key]
      transformKeys.push(key)
      key = asTransformCssVar(key)
    }

    let initialKeyframe = Array.isArray(value) ? value[0] : value

    /**
     * If this is a number and we have a default value type, convert the number
     * to this type.
     */
    const definition = transformDefinitions.get(key)
    if (definition) {
      initialKeyframe = isNumber(value)
        ? definition.toDefaultUnit!(value)
        : value
    }

    initialKeyframes[key] = initialKeyframe
  }

  if (transformKeys.length) {
    initialKeyframes.transform = buildTransformTemplate(transformKeys)
  }

  return initialKeyframes
}
