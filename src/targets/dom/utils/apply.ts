export const createCssVariableRenderer = (element: Element, name: string) => {
  return (latest: string | number) =>
    (element as HTMLElement).style.setProperty(name, latest as string)
}

export const createStyleRenderer = (element: Element, name: string) => {
  return (latest: string | number) =>
    ((element as HTMLElement).style[name] = latest)
}
