import { MotionKeyframes } from "../dom/types"
import { usePresence } from "framer-motion"
import { useEffect } from "react"

export function useExit(
  target: MotionKeyframes,
  stylesToApply?: MotionKeyframes
) {
  const [isPresent, onExitComplete] = usePresence()

  /**
   * In case we don't have an exit animation defined we still need to
   * call onExitComplete if it exists so AnimatePresence knows it
   * can remove this component.
   */
  useEffect(() => {
    if (!stylesToApply) onExitComplete?.()
  }, [isPresent])

  if (stylesToApply && !isPresent) {
    Object.assign(target, stylesToApply)
    return onExitComplete
  }
}
