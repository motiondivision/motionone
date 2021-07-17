import { AnimationGenerator } from "../types"

export function animateSync(
  animation: AnimationGenerator,
  timeStep = 200,
  round = true
) {
  const output = []
  let step = 0
  let done = false

  while (!done) {
    const latest = animation.next(step * timeStep)
    output.push(round ? Math.round(latest.value) : latest.value)
    done = latest.done
    step++
  }

  return output
}
