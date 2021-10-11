import { UnresolvedValueKeyframe, ValueKeyframe } from "../types"

export function hydrateKeyframes(
  keyframes: UnresolvedValueKeyframe[],
  readInitialValue: () => string | number
): ValueKeyframe[] {
  for (let i = 0; i < keyframes.length; i++) {
    if (keyframes[i] === null) {
      keyframes[i] = i ? keyframes[i - 1] : readInitialValue()
    }
  }

  return keyframes as ValueKeyframe[]
}

export const keyframesList = (
  keyframes: UnresolvedValueKeyframe | UnresolvedValueKeyframe[]
): UnresolvedValueKeyframe[] =>
  Array.isArray(keyframes) ? keyframes : [keyframes]
