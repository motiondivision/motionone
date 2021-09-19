import { isCssVar } from "./utils/css-var"
import { transformPropertyDefinitions } from "./utils/transforms"

export const style = {
  get: (element: Element, name: string) => {
    name = getValueName(name)

    let value = isCssVar(name)
      ? (element as HTMLElement).style.getPropertyValue(name)
      : getComputedStyle(element)[name]

    if (!value && value !== 0) {
      const definition = transformPropertyDefinitions.get(name)
      if (definition) value = definition.initialValue
    }

    return value
  },
  set: (element: Element, name: string, value: string | number) => {
    name = getValueName(name)

    if (isCssVar(name)) {
      ;(element as HTMLElement).style.setProperty(name, value as string)
    } else {
      ;(element as HTMLElement).style[name] = value
    }
  },
}
