import { animate } from "../animate"

describe("animate", () => {
  test("Applies target keyframe when animation has finished", async () => {
    const div = document.createElement("div")
    const animation = animate(div, { opacity: 0 }, { duration: 0 })
    await animation.finished.then(() => {
      expect(div).toHaveStyle("opacity: 0")
    })
  })

  test("Fires onStart when animation starts", async () => {
    const div = document.createElement("div")
    const onStart = jest.fn()
    animate(div, { opacity: 0 }, { duration: 0, onStart })
    expect(onStart).toHaveBeenCalledTimes(1)
  })

  test("Fires onComplete when animation completes", async () => {
    const div = document.createElement("div")
    const onComplete = jest.fn()
    const animation = animate(div, { opacity: 0 }, { duration: 0, onComplete })
    await animation.finished.then(() => {
      expect(onComplete).toHaveBeenCalledTimes(1)
    })
  })
})
