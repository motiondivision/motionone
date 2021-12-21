import "config/waapi-polyfill"
import { style } from "../../animate/style"
import { createTestMotionState } from "./utils"

describe("createMotionState()", () => {
  test("Types are correct", () => {
    createTestMotionState({
      hover: "enlarge",
      press: { scale: 2 },
    })
  })

  test("Style returns `initial` on mount", async () => {
    const { state } = createTestMotionState({
      initial: { scale: 2 },
    })

    expect(state.getTarget()).toEqual({
      scale: 2,
    })
  })

  test("If `initial` is false, style returns `animate` on mount", async () => {
    const { state } = createTestMotionState({
      initial: false,
      animate: { scale: 2 },
    })

    expect(state.getTarget()).toEqual({
      scale: 2,
    })
  })

  test("If animate is different to initial, fire animation.", async () => {
    const { element } = createTestMotionState({
      initial: { scale: 2 },
      animate: { scale: 1.5 },
      transition: { duration: 0.01 },
    })

    expect(style.get(element, "scale")).toBe("2")
    expect(element).toHaveStyle("transform: scale(var(--motion-scale))")

    const motionStartHandler = jest.fn()
    const motionCompleteHandler = jest.fn()

    await new Promise<void>((resolve) => {
      element.addEventListener("motionstart", ({ detail }) =>
        motionStartHandler(detail.target)
      )
      element.addEventListener("motioncomplete", ({ detail }) => {
        motionCompleteHandler(detail.target)
        resolve()
      })
    })

    expect(motionStartHandler).toBeCalledWith({ scale: 1.5 })
    expect(motionCompleteHandler).toBeCalled()
    expect(style.get(element, "scale")).toBe("1.5")
    expect(element).toHaveStyle("transform: scale(var(--motion-scale))")
  })

  test("If animate is different to previous animate, fire animation.", async () => {
    const { element, state } = createTestMotionState({
      initial: { scale: 2 },
      animate: { scale: 1.5 },
      transition: { duration: 0.01 },
    })

    expect(style.get(element, "scale")).toBe("2")
    expect(element).toHaveStyle("transform: scale(var(--motion-scale))")

    let resolver = () => {}
    await new Promise<void>((resolve) => {
      resolver = () => resolve()
      element.addEventListener("motioncomplete", resolver)
    })

    element.removeEventListener("motioncomplete", resolver)

    expect(style.get(element, "scale")).toBe("1.5")
    expect(element).toHaveStyle("transform: scale(var(--motion-scale))")

    await new Promise<void>((resolve) => {
      resolver = () => resolve()
      element.addEventListener("motioncomplete", resolver)
      state.update({
        animate: { scale: 3, x: 100 },
        transition: { duration: 0.01 },
      })
    })

    expect(style.get(element, "scale")).toBe("3")
    expect(style.get(element, "x")).toBe("100px")
    expect(element).toHaveStyle(
      "transform: translateX(var(--motion-translateX)) scale(var(--motion-scale))"
    )
  })

  test("State type can override default transition", async () => {
    const { element } = createTestMotionState({
      initial: { opacity: 0 },
      animate: { opacity: 0.5, transition: { duration: 0.1 } },
      transition: { duration: 10 },
    })

    expect(style.get(element, "opacity")).toBe("0")

    await new Promise<void>((resolve, reject) => {
      element.addEventListener("motioncomplete", () => resolve())
      setTimeout(() => reject(), 1000)
    })

    expect(style.get(element, "opacity")).toBe("0.5")
  })

  // test("New poses trigger animations if different", async () => {
  //   const { element, state } = createTestMotionState({
  //     animate: { opacity: 1 },
  //   })

  //   await new Promise((resolve) => {
  //     state.update({ animate: { opacity: 1 }, transition: { duration: 0.01 } })
  //     element.addEventListener("motioncomplete", () => resolve(true))
  //   })

  //   expect(element).toHaveStyle("opacity: 0.5")
  // })

  // test("New poses don't trigger animations if the same", async () => {
  //   const { element, state } = createTestMotionState({
  //     animate: { opacity: 1 },
  //   })

  //   const promise = new Promise((resolve, reject) => {
  //     state.update({ animate: { opacity: 1 }, transition: { duration: 0.01 } })
  //     element.addEventListener("motioncomplete", reject)
  //     setTimeout(() => resolve(true), 100)
  //   })

  //   expect(promise).resolves.toEqual(true)
  // })

  // test("If value is removed from active pose, animate to initial base target", async () => {
  //   const { element, state } = createTestMotionState({
  //     animate: { opacity: 1, scale: 2 },
  //     transition: { duration: 0.01 },
  //   })
  //   element.style.opacity = "0.5"

  //   await new Promise<void>((resolve, reject) => {
  //     function nextAnimation() {
  //       element.removeEventListener("motioncomplete", nextAnimation)
  //       element.addEventListener("motioncomplete", () => resolve())
  //       expect(element).toHaveStyle("opacity: 1; --motion-scale: 2")
  //       state.update({
  //         animate: { opacity: 1, scale: 2 },
  //         transition: { duration: 0.01 },
  //       })
  //     }

  //     element.addEventListener("motioncomplete", nextAnimation)

  //     setTimeout(reject, 200)
  //   })

  //   expect(element).toHaveStyle("opacity: 0.5; --motion-scale: 1")
  // })
})
