import { AcceptedElements } from "../types"

export function resolveElements(elements: AcceptedElements): Element[] {
  if (typeof elements === "string") {
    elements = document.querySelectorAll(elements)
  } else if (elements instanceof Element) {
    elements = [elements]
  }

  return Array.from(elements)
}
