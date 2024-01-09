import { fireEvent, getByTestId } from "@testing-library/dom"
import "@testing-library/jest-dom"

class FakePointerEvent extends Event {
  pointerType: string
  constructor(type: any, props: any) {
    super(type, props)
    this.pointerType = props.pointerType || "mouse"
  }
}

;(window as any).PointerEvent = FakePointerEvent

export const click = (element: any) => fireEvent.click(element)

export const pointerEnter = (element: any, type?: any) => {
  fireEvent.pointerEnter(
    element,
    !type
      ? undefined
      : new FakePointerEvent("pointerenter", { pointerType: type })
  )
}

export const pointerLeave = (element: any) => fireEvent.pointerLeave(element)
export const pointerDown = (element: any) => fireEvent.pointerDown(element)
export const pointerUp = (element: any) => fireEvent.pointerUp(element)
export const focus = (element: any, testId: any) =>
  getByTestId(element, testId).focus()
export const blue = (element: any, testId: any) =>
  getByTestId(element, testId).blur()
