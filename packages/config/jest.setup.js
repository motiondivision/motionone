require("@testing-library/jest-dom")
const { fireEvent, getByTestId } = require("@testing-library/dom")

class FakePointerEvent extends Event {
  constructor(type, props) {
    super(type, props)
    this.pointerType = props.pointerType || "mouse"
  }
}

window.PointerEvent = FakePointerEvent

module.exports = {
  click: (element) => fireEvent.click(element),
  pointerEnter: (element, type) =>
    fireEvent.pointerEnter(
      element,
      !type
        ? undefined
        : new FakePointerEvent("pointerenter", { pointerType: type })
    ),
  pointerLeave: (element) => fireEvent.pointerLeave(element),
  pointerDown: (element) => fireEvent.pointerDown(element),
  pointerUp: (element) => fireEvent.pointerUp(element),
  focus: (element, testId) => getByTestId(element, testId).focus(),
  blue: (element, testId) => getByTestId(element, testId).blur(),
}
