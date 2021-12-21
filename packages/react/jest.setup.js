require("@testing-library/jest-dom")
const { getByTestId } = require("@testing-library/dom")
const { fireEvent, render: testRender, act } = require("@testing-library/react")
const React = require("react")

class FakePointerEvent extends Event {
  pointerType = "mouse"

  constructor(type, props) {
    super(type, props)
    this.pointerType = props.pointerType || "mouse"
  }
}

window.PointerEvent = FakePointerEvent

module.exports = {
  click: (element) =>
    act(() => {
      fireEvent.click(element)
    }),
  pointerEnter: (element, type) =>
    act(() => {
      fireEvent.pointerEnter(
        element,
        !type
          ? undefined
          : new FakePointerEvent("pointerenter", { pointerType: type })
      )
    }),
  pointerLeave: (element) =>
    act(() => {
      fireEvent.pointerLeave(element)
    }),
  pointerDown: (element) =>
    act(() => {
      fireEvent.pointerDown(element)
    }),
  pointerUp: (element) =>
    act(() => {
      fireEvent.pointerUp(element)
    }),
  focus: (element, testId) =>
    act(() => {
      getByTestId(element, testId).focus()
    }),
  blue: (element, testId) =>
    act(() => {
      getByTestId(element, testId).blur()
    }),
  render: (children) => {
    return testRender(React.createElement(React.StrictMode, { children }))
  },
}
