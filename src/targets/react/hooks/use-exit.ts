import { MotionKeyframes } from "../../dom/types"
import { usePresence } from "framer-motion"
import { useEffect } from "react"
import { AnimatedProps, AnimationContextProps } from "../types"
import { resolveVariant } from "../utils/variants"

export function useExit(
  target: MotionKeyframes,
  { exit, variants }: AnimatedProps,
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
    Object.assign(target, resolveVariant(exit, inheritedExit, variants))
    return onExitComplete
  }
}
