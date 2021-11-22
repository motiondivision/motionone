import { isCssVar } from "./utils/css-var"
import { getStyleName } from "./utils/get-style-name"
import { transformDefinitions } from "./utils/transforms"

export const style = {
  get: (element: Element, name: string): string | undefined => {
    name = getStyleName(name)
    let value = isCssVar(name)
      ? (element as HTMLElement).style.getPropertyValue(name)
      : getComputedStyle(element)[name]

    if (!value && value !== 0) {
      const definition = transformDefinitions.get(name)
      if (definition) value = definition.initialValue
    }

    return value
  },
}
