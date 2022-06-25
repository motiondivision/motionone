import { view } from "../index"
import { getActiveObserver } from "./mock-intersection-observer"

describe("view", () => {
  test("Fires onEnter when element enters viewport", async () => {
    const onEnter = jest.fn()
    const element = document.createElement("div")
    view(element, { onEnter })

    expect(getActiveObserver()).toBeTruthy()
    getActiveObserver()?.([{ isIntersecting: true }])

    expect(onEnter).toBeCalledTimes(1)
    getActiveObserver()?.([{ isIntersecting: false }])
    getActiveObserver()?.([{ isIntersecting: true }])
    expect(onEnter).toBeCalledTimes(2)
  })

  test("Fires onLeave when element leaves viewport", async () => {
    const onLeave = jest.fn()
    const element = document.createElement("div")
    view(element, { onLeave })

    expect(getActiveObserver()).toBeTruthy()
    getActiveObserver()?.([{ isIntersecting: true }])
    getActiveObserver()?.([{ isIntersecting: false }])

    expect(onLeave).toBeCalledTimes(1)
  })

  test("Stops observing when returned callback is fired", async () => {
    const onEnter = jest.fn()
    const element = document.createElement("div")
    const stop = view(element, { onEnter })

    expect(getActiveObserver()).toBeTruthy()
    getActiveObserver()?.([{ isIntersecting: true }])

    expect(onEnter).toBeCalledTimes(1)

    stop()

    getActiveObserver()?.([{ isIntersecting: false }])
    getActiveObserver()?.([{ isIntersecting: true }])

    expect(onEnter).toBeCalledTimes(1)
  })

  test("Only fires onEnter once if once: true", async () => {
    const onEnter = jest.fn()
    const element = document.createElement("div")
    view(element, { onEnter, once: true })

    expect(getActiveObserver()).toBeTruthy()
    getActiveObserver()?.([{ isIntersecting: true }])

    expect(onEnter).toBeCalledTimes(1)
    getActiveObserver()?.([{ isIntersecting: false }])
    getActiveObserver()?.([{ isIntersecting: true }])
    expect(onEnter).toBeCalledTimes(1)
  })
})
