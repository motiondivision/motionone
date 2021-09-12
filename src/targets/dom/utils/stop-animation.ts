import { BasicAnimationControls } from "../types"

export interface WithCommitStyles {
  commitStyles: VoidFunction
  cancel: VoidFunction
}

export function stopAnimation(animation: BasicAnimationControls) {
  // Suppress error thrown by WAAPI
  try {
    animation.commitStyles()
    animation.cancel()
  } catch (e) {}
}
