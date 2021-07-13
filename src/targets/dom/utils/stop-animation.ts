import { AnimationWithCommitStyles } from "../types"

export function stop(animation: AnimationWithCommitStyles) {
  animation.commitStyles()
  animation.cancel()
}
