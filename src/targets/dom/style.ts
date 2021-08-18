import { isCssVar } from "./utils/css-var"
import { transformPropertyDefinitions } from "./utils/transforms"

export const style = {
  get: (element: Element, name: string) => {
    let value = isCssVar(name)
      ? (element as HTMLElement).style.getPropertyValue(name)
      : getComputedStyle(element)[name]

    if (!value && value !== 0) {
      const definition = transformPropertyDefinitions.get(name)
      if (definition) value = definition.initialValue
    }

    return value
  },
}
