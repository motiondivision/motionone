import { isCssVar } from "./utils/css-var"

export const style = {
  // TODO: Support transforms
  get: (element: Element, name: string) =>
    isCssVar(name)
      ? (element as HTMLElement).style.getPropertyValue(name)
      : getComputedStyle(element)[name],
}
