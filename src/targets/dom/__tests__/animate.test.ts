import { animate } from "../animate"

describe("animate", () => {
  test("Applies target keyframe when animation has finished", async () => {
    const div = document.createElement("div")
    const animation = animate(
      div,
      { opacity: [0, 1], "--css-var": 1 },
      { duration: 0, offset: [0, 1], x: {}, "--css-var": {} }
    )
    await animation.finished.then(() => {
      expect(div).toHaveStyle("opacity: 0")
    })
  })

  test("Applies final target keyframe when animation has finished", async () => {
    const div = document.createElement("div")
    const animation = animate(
      div,
      { opacity: [0, 0.5] },
      { duration: 0, offset: [0, 1] }
    )
    await animation.finished.then(() => {
      expect(div).toHaveStyle("opacity: 0.5")
    })
  })
})
