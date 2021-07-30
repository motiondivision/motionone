import { AnimationControls, AnimationOptions } from "../dom/types"
import { isEasingList } from "../dom/utils/easing"
import { getEasingFunction } from "./easing/get-function"
import { slowInterpolateNumbers } from "./utils/interpolate"

export class Animation implements Omit<AnimationControls, "stop"> {
  private resolve: (value: any) => void

  private reject: (value: any) => void

  private startTime = 0

  private pauseTime: number | undefined

  private rate = 1

  private tick: (t: number) => void

  private playState: AnimationPlayState = "idle"

  constructor(
    output: (v: number) => void,
    keyframes: number[],
    {
      easing = "ease",
      duration = 0.3,
      delay = 0,
      endDelay = 0,
      offset,
      repeat = 0,
      direction = "normal",
    }: AnimationOptions
  ) {
    const totalDuration = duration * (repeat + 1)

    const interpolate = slowInterpolateNumbers(
      keyframes,
      offset,
      isEasingList(easing)
        ? easing.map(getEasingFunction)
        : getEasingFunction(easing)
    )

    this.tick = (timestamp: number) => {
      if ((this.playState = "finished")) {
        const latest = interpolate(duration)
        output(latest)
        this.resolve(latest)
        return
      }

      let t = this.pauseTime
        ? this.pauseTime
        : (timestamp - this.startTime) * this.rate

      // Convert to seconds
      t /= 1000

      // Rebase on delay
      t = Math.max(t - delay, 0)

      const progress = t / duration
      // TODO progress += iterationStart
      let iterationProgress = progress % 1
      let currentIteration = Math.floor(progress)
      if (iterationProgress === 1) currentIteration--

      // Reverse progress
      if (direction !== "normal") {
        const iterationIsOdd = currentIteration % 2
        if (
          direction === "reverse" ||
          (direction === "alternate" && iterationIsOdd) ||
          (direction === "alternate-reverse" && !iterationIsOdd)
        ) {
          iterationProgress = 1 - iterationProgress
        }
      }

      const latest = interpolate(Math.min(iterationProgress, 1))
      output(latest)

      const isFinished = t > totalDuration + endDelay

      if (isFinished) {
        this.playState = "finished"
        this.resolve(latest)
      } else if (this.playState !== "idle") {
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
    const now = performance.now()
    this.playState = "running"
    if (!this.startTime) {
      this.startTime = now
    } else if (this.pauseTime) {
      this.startTime = now - (this.pauseTime - this.startTime)
    }
    this.pauseTime = undefined
    requestAnimationFrame(this.tick)
  }

  pause() {
    this.playState = "paused"
    this.pauseTime = performance.now()
  }

  finish() {
    this.playState = "finished"
    this.tick(0)
  }

  cancel() {
    this.playState = "idle"
    this.tick(0)
    this.reject(false)
  }

  reverse() {
    this.rate *= -1
  }

  commitStyles() {
    this.tick(performance.now())
  }

  get currentTime() {
    return this.currentTime
  }

  set currentTime(t: number) {
    if (this.pauseTime || this.rate === 0) {
      this.pauseTime = t
    } else {
      this.startTime = performance.now() - t / this.rate
    }
  }

  get playbackRate() {
    return this.rate
  }

  set playbackRate(rate) {
    this.rate = rate
  }
}
