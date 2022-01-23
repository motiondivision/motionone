import { animate } from "../animate"

function mockReadTime(ms: number) {
  jest.spyOn(window.performance, "now").mockImplementation(() => ms)
}

function mockTimeFrom(seconds: number) {
  const ms = seconds * 1000
  let t = ms
  jest.spyOn(window, "requestAnimationFrame").mockImplementation((cb: any) => {
    t += 50
    setTimeout(() => cb(t), 1)
    return 0
  })
  mockReadTime(ms)
}

beforeEach(() => {
  mockTimeFrom(0)
})

afterEach(() => {
  ;(window.requestAnimationFrame as any).mockRestore()
  ;(window.performance.now as any).mockRestore()
})

describe("animate", () => {
  test("Animates numbers", async () => {
    const output: number[] = []
    const animation = animate((p) => output.push(p))
    await animation.finished
    expect(output).toEqual([
      0.22043358268711016, 0.5759729522294947, 0.8022760787498554,
      0.9248370413624798, 0.9834614620209323, 1,
    ])
  })

  test("Doesn't add 0 frame when stop called", async () => {
    mockTimeFrom(0.5)
    const output: number[] = []
    await new Promise<void>(async (resolve) => {
      const animation = animate((p) => output.push(p))
      await animation.finished
      animation.stop()
      resolve()
    })
    expect(output).toEqual([
      0.22043358268711016, 0.5759729522294947, 0.8022760787498554,
      0.9248370413624798, 0.9834614620209323, 1,
    ])
  })
})
