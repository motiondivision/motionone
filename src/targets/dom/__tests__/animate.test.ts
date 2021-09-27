import { animate } from "../animate"
import "./web-animations.min-edited.js"

/**
 * TODO: All tests currently have to define at least two keyframes
 * because the polyfill doesn't support partial keyframes.
 */

const duration = 0.001

describe("animate", () => {
  test("No type errors", async () => {
    const div = document.createElement("div")
    const animation = animate(
      div,
      { opacity: 0.6, x: 1, scale: 1, "--css-var": 2 },
      {
        duration,
        x: {},
        "--css-var": {
          direction: "alternate",
        },
        stiffness: 1,
        damping: 1,
        mass: 1,
        velocity: 1,
        restSpeed: 1,
        restDelta: 1,
        direction: "alternate",
        easing: "steps(2, start)",
        offset: [0],
      }
    )
    await animation.finished.then(() => {
      expect(true).toBe(true)
    })
  })

  test("Applies target keyframe when animation has finished", async () => {
    const div = document.createElement("div")
    const animation = animate(
      div,
      { opacity: 0.6 },
      { duration, x: {}, "--css-var": {} }
    )
    await animation.finished.then(() => {
      expect(div).toHaveStyle("opacity: 0.6")
    })
  })

  test("Applies final target keyframe when animation has finished", async () => {
    const div = document.createElement("div")
    const animation = animate(div, { opacity: [0.2, 0.5] }, { duration })
    await animation.finished.then(() => {
      expect(div).toHaveStyle("opacity: 0.5")
    })
  })

  test("Applies transform template", async () => {
    const div = document.createElement("div")
    const animation = animate(div, { x: 1 }, { duration })
    await animation.finished.then(() => {
      expect(div).toHaveStyle("transform: translateX(var(--motion-translateX))")
    })
  })

  test.skip("Can manually finish animation", async () => {
    const div = document.createElement("div")
    const animation = animate(div, { opacity: 0.5 }, { duration: 10 })

    return new Promise<void>((resolve) => {
      animation.finished.then(() => {
        expect(div).toHaveStyle("opacity: 0.5")
        resolve()
      })
      animation.finish()
    })
  })

  test.skip("Can manually cancel animation", async () => {
    const div = document.createElement("div")
    div.style.opacity = "0.2"
    const animation = animate(div, { opacity: 0.5 }, { duration: 10 })
    return new Promise<void>((resolve) => {
      animation.finished.catch(() => {
        expect(div).toHaveStyle("opacity: 0.2")
        resolve()
      })
      animation.cancel()
    })
  })

  test("currentTime sets and gets currentTime", async () => {
    const div = document.createElement("div")
    const animation = animate(div, { opacity: 0.5 }, { duration: 10 })

    expect(animation.currentTime).toBe(0)
    animation.currentTime = 50
    expect(animation.currentTime).toBe(50)
  })

  test("duration gets the duration of the animation", async () => {
    const div = document.createElement("div")
    const animation = animate(div, { opacity: 0.5 }, { duration: 10 })

    expect(animation.duration).toBe(10)
  })
})
