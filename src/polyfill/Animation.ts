import { slowInterpolateNumbers } from "../generators/tween"
import { AnimationControls, AnimationOptions } from "../targets/dom/types"
import {
  createCssVariableRenderer,
  createStyleRenderer,
} from "../targets/dom/utils/apply"
import { isCssVar } from "../targets/dom/utils/css-var"

export class Animation implements Omit<AnimationControls, "stop"> {
  private options: AnimationOptions

  private resolve: (value: any) => void

  private reject: (value: any) => void

  private t = 0

  private startTime = 0

  private rate = 1

  private tick: (t: number) => void

  constructor(
    element: Element,
    name: string,
    keyframes: number[],
    options: AnimationOptions
  ) {
    this.options = options

    // TODO Get current vale if keyframes is 1
    // TODO Only accept numbers
    keyframes = keyframes.map(parseFloat as any)

    const interpolate = slowInterpolateNumbers(keyframes, options)
    const render = isCssVar(name)
      ? createCssVariableRenderer(element, name)
      : createStyleRenderer(element, name)

    this.tick = (timestamp: number) => {
      const t = (timestamp - this.startTime) / 1000
      const latest = interpolate(t)
      render(latest + "px")

      const isFinished = false
      if (isFinished) {
        this.resolve(latest)
      } else {
        requestAnimationFrame(this.tick)
      }
    }

    this.play()
  }

  finished = new Promise((resolve, reject) => {
    this.resolve = resolve
    this.reject = reject
  })

  play() {
    this.startTime = performance.now() + (this.options.delay || 0)

    requestAnimationFrame(this.tick)
  }

  pause() {
    // TODO:
  }

  finish() {
    this.currentTime = this.options.duration || 0
    this.commitStyles()
    // TODO: Stop animation
  }

  cancel() {
    // TODO: Stop animation
    this.reject(false)
  }

  reverse() {}

  commitStyles() {
    this.tick(this.currentTime || 0)
  }

  get currentTime() {
    return this.t
  }

  set currentTime(t: number) {
    this.t = t
  }

  get playbackRate() {
    return this.rate
  }

  set playbackRate(rate) {
    this.rate = rate
  }
}
