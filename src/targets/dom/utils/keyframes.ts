import { style } from "../style"
import { UnresolvedValueKeyframe, ValueKeyframe } from "../types"

export function hydrateKeyframes(
  keyframes: UnresolvedValueKeyframe[],
  element: Element,
  name: string
): ValueKeyframe[] {
  for (let i = 0; i < keyframes.length; i++) {
    if (keyframes[i] === null) {
      keyframes[i] = i ? keyframes[i - 1] : style.get(element, name)
    }
  }

  return keyframes as ValueKeyframe[]
}
