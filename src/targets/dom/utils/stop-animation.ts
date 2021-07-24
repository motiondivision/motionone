import { AnimationWithCommitStyles } from "../types"

export function stopAnimation(animation: AnimationWithCommitStyles) {
  animation.commitStyles()
  animation.cancel()
}
