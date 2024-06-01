import { isCssVar } from "./utils/css-var"
import { getStyleName } from "./utils/get-style-name"
import { transformDefinitions } from "./utils/transforms"

type MotionStyleKey = Exclude<
  keyof CSSStyleDeclaration,
  "length" | "parentRule"
>

export const style = {
  get: (element: Element, name: string): string | undefined => {
    name = getStyleName(name)
    let value: any = isCssVar(name)
      ? (element as HTMLElement).style.getPropertyValue(name)
      : getComputedStyle(element)[name as MotionStyleKey]

    // TODO Decide if value can be 0
    if (!value && value !== 0) {
      const definition = transformDefinitions.get(name)
      if (definition) value = definition.initialValue
    }

    return value as string | undefined
  },
  set: (element: Element, name: string, value: string | number) => {
    name = getStyleName(name)

    if (isCssVar(name)) {
      ;(element as HTMLElement).style.setProperty(name, value as string)
    } else {
      ;(element as HTMLElement).style[name as MotionStyleKey] = value as any
    }
  },
}
