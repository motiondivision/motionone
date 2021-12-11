export type RendererFactory = (
  element: Element,
  name: string
) => (latest: string | number) => void

export const cssVariableRenderer: RendererFactory = (element, name) => (
  latest
) => (element as HTMLElement).style.setProperty(name, latest as string)

export const styleRenderer: RendererFactory = (element, name) => (latest) =>
  ((element as HTMLElement).style[name] = latest)
