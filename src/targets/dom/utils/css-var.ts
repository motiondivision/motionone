import { transformPropertyDefinitions } from "./transforms"

export const browserSupportsCssRegisterProperty =
  typeof CSS !== "undefined" &&
  Object.hasOwnProperty.call(CSS, "registerProperty")

export const isCssVar = (name: string) => name.startsWith("--")

const registeredProperties = new Set<string>()

/**
 * TODO:
 * - Pass target keyframe value and auto-detect number, color, length
 */

export function registerCssVariable(name: string) {
  if (registeredProperties.has(name)) return

  try {
    const { syntax, initialValue } =
      transformPropertyDefinitions.get(name) || {}

    ;(CSS as any).registerProperty({
      name,
      inherits: false,
      syntax,
      initialValue,
    })
  } catch (e) {
    console.log(e)
  }
}
