import { AnimationControls, AnimationOptions, Easing } from "../dom/types"
import { defaults } from "../dom/utils/defaults"
import { isEasingList } from "../dom/utils/easing"
import { getEasingFunction } from "./easing/get-function"
import { slowInterpolateNumbers } from "./utils/interpolate"

export class Animation implements Omit<AnimationControls, "stop" | "duration"> {
  private resolve: (value: any) => void

  private reject: (value: any) => void

  private startTime = 0

  private pauseTime: number | undefined

  private rate = 1

  private tick: (t: number) => void

  private t = 0

  private cancelT = 0

  playState: AnimationPlayState = "idle"

  constructor(
    output: (v: number) => void,
    keyframes: number[],
    // TODO Merge in defaults
    {
      easing = defaults.easing as Easing,
      duration = defaults.duration,
      delay = defaults.delay,
      endDelay = defaults.endDelay,
      offset,
      repeat = defaults.repeat,
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
      if (this.playState === "finished") {
        const latest = interpolate(1)
        output(latest)
        this.resolve(latest)
        return
      }

      if (this.pauseTime) {
        timestamp = this.pauseTime
      }

      let t = (timestamp - this.startTime) * this.rate

      this.t = t

      // Convert to seconds
      t /= 1000

      // Rebase on delay
      t = Math.max(t - delay, 0)

      const progress = t / duration

      // TODO progress += iterationStart
      let currentIteration = Math.floor(progress)
      let iterationProgress = progress % 1.0

      if (!iterationProgress && progress >= 1) {
        iterationProgress = 1
      }

      if (iterationProgress === 1) {
        currentIteration--
      }

      // Reverse progress
      const iterationIsOdd = currentIteration % 2
      if (
        direction === "reverse" ||
        (direction === "alternate" && iterationIsOdd) ||
        (direction === "alternate-reverse" && !iterationIsOdd)
      ) {
        iterationProgress = 1 - iterationProgress
      }

      const interpolationIsFinished = t >= totalDuration
      const interpolationProgress = interpolationIsFinished
        ? 1
        : Math.min(iterationProgress, 1)

      const latest = interpolate(interpolationProgress)
      output(latest)

      const isFinished = t >= totalDuration + endDelay
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

    if (this.pauseTime) {
      this.startTime = now - (this.pauseTime - this.startTime)
    } else if (!this.startTime) {
      this.startTime = now
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
    this.tick(this.cancelT)
    this.reject(false)
  }

  reverse() {
    this.rate *= -1
  }

  commitStyles() {
    this.cancelT = this.t
  }

  get currentTime() {
    return this.t
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

export function animateNumber(
  output: (v: number) => void,
  keyframes: number[] = [0, 1],
  options: AnimationOptions = {}
): Animation {
  return new Animation(output, keyframes, options)
}
