export interface WithCommitStyles {
  commitStyles: VoidFunction
  cancel: VoidFunction
}

export function stopAnimation(animation: WithCommitStyles) {
  animation.commitStyles()

  // Suppress error thrown by WAAPI
  try {
    animation.cancel()
  } catch (e) {}
}
