import { KeyframeGenerator, Easing } from "../targets/dom/types"

export function isKeyframeGenerator(
  easing?: Easing | Easing[] | KeyframeGenerator
): easing is KeyframeGenerator {
  return (
    typeof easing === "object" &&
    (easing as KeyframeGenerator).isKeyframeGenerator
  )
}
