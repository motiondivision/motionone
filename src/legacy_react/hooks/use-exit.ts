import type {
  AnimationOptionsWithOverrides,
  MotionKeyframes,
} from "../../dom/types"
import type { AnimatedProps, AnimationContextProps } from "../types"
import { usePresence } from "framer-motion"
import { useEffect } from "react"
import { resolvePose } from "../utils/poses"
import { updateTargetAndOptions } from "../utils/update-target"

export function useExit(
  target: MotionKeyframes,
  options: AnimationOptionsWithOverrides,
  { exit, poses }: AnimatedProps,
  { exit: inheritedExit }: AnimationContextProps
) {
  const [isPresent, onExitComplete] = usePresence()

  /**
   * In case we don't have an exit animation defined we still need to
   * call onExitComplete if it exits so AnimatePresence knows it
   * can remove this component.
   */
  useEffect(() => {
    if (!exit) onExitComplete?.()
  }, [isPresent])

  if (exit && !isPresent) {
    updateTargetAndOptions(
      target,
      options,
      resolvePose(exit, inheritedExit, poses)
    )
    return onExitComplete
  }
}
