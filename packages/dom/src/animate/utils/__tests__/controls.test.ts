import { BasicAnimationControls } from "@motionone/types"
import { wrapAnimationWithControls } from "../controls"

interface TestAnimationOptions {
  startTime?: number
  currentTime?: number
  playbackRate?: number
  playState?: AnimationPlayState
}

function isPromise(p: Promise<any>): p is Promise<any> {
  if (typeof p === "object" && typeof p.then === "function") {
    return true
  }

  return false
}

function isFunction(f: any): f is VoidFunction {
  return typeof f === "function"
}

function testAnimation({
  startTime = 0,
  currentTime = 0,
  playbackRate = 1,
  playState = "idle",
}: TestAnimationOptions): BasicAnimationControls {
  return {
    play: () => {},
    pause: () => {},
    commitStyles: () => {},
    cancel: () => {},
    finish: () => {},
    reverse: () => {},
    stop: () => {},
    playState,
    finished: new Promise(() => {}),
    startTime,
    currentTime,
    playbackRate,
  } as any
}

describe("Animation controls Proxy", () => {
  test("Returns duration from explicitly provided argument", () => {
    const controls = wrapAnimationWithControls(
      [() => testAnimation({ currentTime: 500 })],
      1
    )
    expect(controls.duration).toBe(1)
  })

  test("Returns currentTime in seconds", () => {
    const controls = wrapAnimationWithControls(
      [() => testAnimation({ currentTime: 500 })],
      1
    )
    expect(controls.currentTime).toBe(0.5)
  })

  test("Returns playbackRate", () => {
    const controls = wrapAnimationWithControls(
      [() => testAnimation({ playbackRate: 0.5 })],
      1
    )
    expect(controls.playbackRate).toBe(0.5)
  })

  test("Returns finished promise", () => {
    const controls = wrapAnimationWithControls([() => testAnimation({})], 1)
    expect(isPromise(controls.finished)).toEqual(true)
  })

  test("Returns supported functions", () => {
    const controls = wrapAnimationWithControls([() => testAnimation({})], 1)
    expect(isFunction(controls.play)).toEqual(true)
    expect(isFunction(controls.pause)).toEqual(true)
    expect(isFunction(controls.commitStyles)).toEqual(true)
    expect(isFunction(controls.cancel)).toEqual(true)
    expect(isFunction(controls.stop)).toEqual(true)
    expect(isFunction(controls.finish)).toEqual(true)
    expect(isFunction(controls.reverse)).toEqual(true)
  })

  test("Unsupported functions/values are undefined", () => {
    const controls = wrapAnimationWithControls([() => testAnimation({})], 1)
    expect((controls as any).wooooo).toEqual(undefined)
  })

  test("Reads playState", () => {
    const controls = wrapAnimationWithControls(
      [() => testAnimation({ playState: "finished" })],
      1
    )
    expect(controls.playState).toEqual("finished")
  })
})
