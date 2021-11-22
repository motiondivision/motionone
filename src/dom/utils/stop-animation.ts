import { BasicAnimationControls } from "../types"

export interface WithCommitStyles {
  commitStyles: VoidFunction
  cancel: VoidFunction
}

export function stopAnimation(animation?: BasicAnimationControls) {
  if (!animation) return

  // Suppress error thrown by WAAPI
  try {
    /**
     * commitStyles has overhead so we only want to commit and cancel
     */
    animation.playState !== "finished" && animation.commitStyles()
    animation.cancel()
  } catch (e) {}
}
