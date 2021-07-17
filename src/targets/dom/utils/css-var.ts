import { CssPropertyDefinition } from "../types"
import { transformPropertyDefinitions } from "./transforms"

export const browserSupportsCssRegisterProperty =
  typeof CSS !== "undefined" &&
  Object.hasOwnProperty.call(CSS, "registerProperty")

export const isCssVar = (name: string) => name.startsWith("--")

export const registeredProperties = new Set<string>()

/**
 * TODO:
 * - Pass target keyframe value and auto-detect number, color, length
 */

export function registerCssVariable(name: string, value?: string | number) {
  if (registeredProperties.has(name)) return

  registeredProperties.add(name)

  try {
    const { syntax, initialValue } = transformPropertyDefinitions.has(name)
      ? transformPropertyDefinitions.get(name)!
      : detectCssPropertyType(value)

    ;(CSS as any).registerProperty({
      name,
      inherits: false,
      syntax,
      initialValue,
    })
  } catch (e) {}
}

export function detectCssPropertyType(
  _value?: string | number
): Partial<CssPropertyDefinition> {
  return {}
}
