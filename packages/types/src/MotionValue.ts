import type { AnimationGenerator, BasicAnimationControls } from "./"

export class MotionValue<V = any> {
  animation?: BasicAnimationControls
  generatorStartTime?: number
  generator?: AnimationGenerator
  current?: V
  updatedAt?: number

  setAnimation(animation?: BasicAnimationControls) {
    this.animation = animation

    animation?.finished.then(() => this.clearAnimation()).catch(() => {})
  }

  clearAnimation() {
    this.animation = this.generator = undefined
  }

  set(current: V) {
    this.current = current
    this.updatedAt = performance.now()
  }
}
