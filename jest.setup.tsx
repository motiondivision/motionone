import "@testing-library/jest-dom"
import { getByTestId } from "@testing-library/dom"
import { fireEvent, render as testRender, act } from "@testing-library/react"
import * as React from "react"

class FakePointerEvent extends Event {
  pointerType: "mouse"

  constructor(type: any, props: any) {
    super(type, props)
    this.pointerType = props.pointerType || "mouse"
  }
}

global.PointerEvent = FakePointerEvent as any

export const click = (element: Element) =>
  act(() => {
    fireEvent.click(element)
  })
export const pointerEnter = (element: Element, type?: "mouse" | "touch") =>
  act(() => {
    fireEvent.pointerEnter(
      element,
      !type
        ? undefined
        : new FakePointerEvent("pointerenter", { pointerType: type })
    )
  })
export const pointerLeave = (element: Element) =>
  act(() => {
    fireEvent.pointerLeave(element)
  })
export const pointerDown = (element: Element) =>
  act(() => {
    fireEvent.pointerDown(element)
  })
export const pointerUp = (element: Element) =>
  act(() => {
    fireEvent.pointerUp(element)
  })
export const focus = (element: HTMLElement, testId: string) =>
  act(() => {
    getByTestId(element, testId).focus()
  })
export const blur = (element: HTMLElement, testId: string) =>
  act(() => {
    getByTestId(element, testId).blur()
  })

export const render = (children: any) => {
  const renderReturn = testRender(
    <React.StrictMode>{children}</React.StrictMode>
  )

  return {
    ...renderReturn,
    rerender: (children: any) =>
      renderReturn.rerender(<React.StrictMode>{children}</React.StrictMode>),
  }
}
