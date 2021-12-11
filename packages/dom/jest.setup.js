require("@testing-library/jest-dom")

class FakePointerEvent extends Event {
  constructor(type, props) {
    super(type, props)
    this.pointerType = props.pointerType || "mouse"
  }
}

window.PointerEvent = FakePointerEvent
