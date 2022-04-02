import type { BasicAnimationControls } from "@motionone/types"

export interface WithCommitStyles {
  commitStyles: VoidFunction
  cancel: VoidFunction
}

export function stopAnimation(
  animation?: BasicAnimationControls,
  needsCommit = true
) {
  if (!animation || animation.playState === "finished") return

  // Suppress error thrown by WAAPI
  try {
    if (animation.stop) {
      animation.stop()
    } else {
      needsCommit && animation.commitStyles()
      animation.cancel()
    }
  } catch (e) {}
}
