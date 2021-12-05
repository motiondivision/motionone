import { transformDefinitions } from "./transforms"

export const isCssVar = (name: string) => name.startsWith("--")

export const registeredProperties = new Set<string>()

export function registerCssVariable(name: string) {
  if (registeredProperties.has(name)) return
  registeredProperties.add(name)

  try {
    const { syntax, initialValue } = transformDefinitions.has(name)
      ? transformDefinitions.get(name)!
      : ({} as any)

    ;(CSS as any).registerProperty({
      name,
      inherits: false,
      syntax,
      initialValue,
    })
  } catch (e) {}
}
