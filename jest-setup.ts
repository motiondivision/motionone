import "@testing-library/jest-dom"

class TestAnimation {
  finished: Promise<void>

  constructor(_keyframes: any, _options: any) {
    const promise = new Promise<void>((resolve) => {
      resolve()
    })

    this.finished = promise
  }
}

Element.prototype.animate = (keyframes, options) =>
  new TestAnimation(keyframes, options) as any
