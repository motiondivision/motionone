import { getAnimationData } from "../data"
import { BasicAnimationControls } from "../types"
import { getStyleName } from "./get-style-name"

export interface WithCommitStyles {
  commitStyles: VoidFunction
  cancel: VoidFunction
}

export function stopElementAnimation(element: Element, key: string) {
  const data = getAnimationData(element)
  const name = getStyleName(key)
  const animation = data.activeAnimations[name]
  if (animation) {
    const generator = data.activeGenerators[name]
    if (generator) {
      data.prevGeneratorState[name] = generator.next(
        (animation as any).currentTime
      )
    }
    stopAnimation(animation)
  }
}

export function stopAnimation(animation: BasicAnimationControls) {
  // Suppress error thrown by WAAPI
  try {
    /**
     * commitStyles has overhead so we only want to commit and cancel
     */
    animation.playState !== "finished" && animation.commitStyles()
    animation.cancel()
  } catch (e) {}
}
