import { AnimationGenerator, Easing } from "../targets/dom/types"

export function isAnimationGenerator(
  easing?: Easing | Easing[] | AnimationGenerator
): easing is AnimationGenerator {
  return (
    typeof easing === "object" &&
    (easing as AnimationGenerator).isAnimationGenerator
  )
}
