import { AnimationWithCommitStyles } from "../types"

export function stopAnimation(animation: AnimationWithCommitStyles) {
  animation.commitStyles()

  // Suppress error thrown by WAAPI
  try {
    animation.cancel()
  } catch (e) {}
}
