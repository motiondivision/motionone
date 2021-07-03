import { AnimationState, SpringOptions } from "../animations/spring/types"
import { getAnimationMetadata } from "./metadata"
import { cssVar } from "./css-variables"
import { getDefaultValueType } from "./value-types"
import { spring } from "../animations/spring"

const timeResolution = 20

export function animateSpring(
  element: HTMLElement,
  name: string, // TODO Make transform enum
  target: number,
  options: SpringOptions
) {
  const { animations, springGenerators } = getAnimationMetadata(element)

  const valueType = getDefaultValueType(name)
  const current = element.style.getPropertyValue(cssVar(name))
  let from = current === "" ? valueType.defaultValue : parseFloat(current)
  let velocity = 0

  const prevAnimation = animations[name]
  const prevGenerator = springGenerators[name]

  if (prevAnimation?.playState === "running" && prevGenerator) {
    const latest = prevGenerator.next(prevAnimation.currentTime)
    from = latest.value
    velocity = latest.velocity || 0
    // console.log("current time", prevAnimation.currentTime, "velocity", velocity)
  }
  // console.log({ from, to: target, velocity, ...options })
  const generator = spring({ from, to: target, velocity, ...options })
  springGenerators[name] = generator

  let isPlaying = true
  let duration = 0
  let latest: AnimationState<number>

  const keyframes: string[] = []
  while (isPlaying) {
    latest = generator.next(duration)
    keyframes.push(valueType.asUnit(latest.value))
    duration += timeResolution
    // TODO Check damping ratio or impose max number of frames
    if (latest.done) isPlaying = false
  }

  prevAnimation?.cancel()
  animations[name] = element.animate(
    { [cssVar(name)]: keyframes },
    { easing: "linear", duration }
  )
  // console.log(keyframes)
  element.style.transform =
    "translateX(var(--motion-x)) translateY(var(--motion-y))"

  animations[name].finished
    .then(() =>
      element.style.setProperty(cssVar(name), valueType.asUnit(target))
    )
    .catch(() => {})

  return animations[name]
}
