export interface WithCommitStyles {
  commitStyles: VoidFunction
  cancel: VoidFunction
}

export function stopAnimation(animation: WithCommitStyles) {
  // Suppress error thrown by WAAPI
  try {
    animation.commitStyles()
    animation.cancel()
  } catch (e) {}
}
