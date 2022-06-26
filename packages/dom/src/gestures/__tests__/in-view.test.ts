import { inView } from "../in-view"
import { getActiveObserver } from "./mock-intersection-observer"

describe("view", () => {
  test("Fires onEnter when element enters viewport", async () => {
    const onEnter = () => () => {}
    const mockedOnEnter = jest.fn(onEnter)
    const element = document.createElement("div")
    inView(element, mockedOnEnter)

    expect(getActiveObserver()).toBeTruthy()
    getActiveObserver()?.([{ target: element, isIntersecting: true }])

    expect(mockedOnEnter).toBeCalledTimes(1)
    getActiveObserver()?.([{ target: element, isIntersecting: false }])
    getActiveObserver()?.([{ target: element, isIntersecting: true }])
    expect(mockedOnEnter).toBeCalledTimes(2)
  })

  test("Fires onLeave when element leaves viewport", async () => {
    const onLeave = jest.fn()
    const onEnter = () => onLeave
    const element = document.createElement("div")
    inView(element, onEnter)

    expect(getActiveObserver()).toBeTruthy()
    getActiveObserver()?.([{ target: element, isIntersecting: true }])
    getActiveObserver()?.([{ target: element, isIntersecting: false }])

    expect(onLeave).toBeCalledTimes(1)
  })

  test("Stops observing when returned callback is fired", async () => {
    const onEnter = () => () => {}
    const mockedOnEnter = jest.fn(onEnter)
    const element = document.createElement("div")
    const stop = inView(element, mockedOnEnter)

    expect(getActiveObserver()).toBeTruthy()
    getActiveObserver()?.([{ target: element, isIntersecting: true }])

    expect(mockedOnEnter).toBeCalledTimes(1)

    stop()

    getActiveObserver()?.([{ target: element, isIntersecting: false }])
    getActiveObserver()?.([{ target: element, isIntersecting: true }])

    expect(mockedOnEnter).toBeCalledTimes(1)
  })

  test("Only fires onEnter once if it returns void", async () => {
    const onEnter = jest.fn()
    const element = document.createElement("div")
    inView(element, onEnter)

    expect(getActiveObserver()).toBeTruthy()
    getActiveObserver()?.([{ target: element, isIntersecting: true }])

    expect(onEnter).toBeCalledTimes(1)
    getActiveObserver()?.([{ target: element, isIntersecting: false }])
    getActiveObserver()?.([{ target: element, isIntersecting: true }])
    expect(onEnter).toBeCalledTimes(1)
  })
})
