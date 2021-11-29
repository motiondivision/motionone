import type { GlideOptions } from "./types"
import type { AnimationGenerator, AnimationGeneratorState } from "../../types"
import { calcVelocity, createSpringGenerator } from "../spring/generator"
import { ms } from "../../../dom/utils/time.js"

export const createGlideGenerator = ({
  from = 0,
  velocity = 0.0,
  power = 0.8,
  decay = 0.325,
  bounceDamping,
  bounceStiffness,
  changeTarget,
  min,
  max,
  restDistance = 0.5,
  restSpeed,
}: GlideOptions) => {
  decay = ms(decay)

  const state: AnimationGeneratorState = {
    value: from,
    target: from,
    velocity,
    hasReachedTarget: false,
    done: false,
  }

  const isOutOfBounds = (v: number) =>
    (min !== undefined && v < min) || (max !== undefined && v > max)

  const nearestBoundary = (v: number) => {
    if (min === undefined) return max
    if (max === undefined) return min

    return Math.abs(min - v) < Math.abs(max - v) ? min : max
  }

  let amplitude = power * velocity
  const ideal = from + amplitude
  const target = changeTarget === undefined ? ideal : changeTarget(ideal)
  state.target = target

  /**
   * If the target has changed we need to re-calculate the amplitude, otherwise
   * the animation will start from the wrong position.
   */
  if (target !== ideal) amplitude = target - from

  const calcDelta = (t: number) => -amplitude * Math.exp(-t / decay)

  const calcLatest = (t: number) => target + calcDelta(t)

  const applyFriction = (t: number) => {
    const delta = calcDelta(t)
    const latest = calcLatest(t)
    state.done = Math.abs(delta) <= restDistance
    state.value = state.done ? target : latest
    state.velocity =
      t === 0 ? velocity : calcVelocity(calcLatest, t, state.value)
  }

  /**
   * Ideally this would resolve for t in a stateless way, we could
   * do that by always precalculating the animation but as we know
   * this will be done anyway we can assume that spring will
   * be discovered during that.
   */
  let timeReachedBoundary: number | undefined
  let spring: AnimationGenerator | undefined

  const checkCatchBoundary = (t: number) => {
    if (!isOutOfBounds(state.value)) return

    timeReachedBoundary = t

    spring = createSpringGenerator({
      from: state.value,
      to: nearestBoundary(state.value),
      velocity: state.velocity,
      damping: bounceDamping,
      stiffness: bounceStiffness,
      restDistance,
      restSpeed,
    })
  }

  checkCatchBoundary(0)

  return {
    next: (t: number) => {
      /**
       * We need to resolve the friction to figure out if we need a
       * spring but we don't want to do this twice per frame. So here
       * we flag if we updated for this frame and later if we did
       * we can skip doing it again.
       */
      let hasUpdatedFrame = false
      if (!spring && timeReachedBoundary === undefined) {
        hasUpdatedFrame = true
        applyFriction(t)
        checkCatchBoundary(t)
      }

      /**
       * If we have a spring and the provided t is beyond the moment the friction
       * animation crossed the min/max boundary, use the spring.
       */
      if (timeReachedBoundary !== undefined && t > timeReachedBoundary) {
        state.hasReachedTarget = true
        return spring!.next(t - timeReachedBoundary)
      } else {
        state.hasReachedTarget = false
        !hasUpdatedFrame && applyFriction(t)
        return state
      }
    },
  }
}
