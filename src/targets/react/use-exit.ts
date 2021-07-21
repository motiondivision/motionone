import { MotionKeyframes } from "../dom/types"
import { usePresence } from "framer-motion"

export function useExit(
  target: MotionKeyframes,
  stylesToApply?: MotionKeyframes
) {
  const [isPresent, onExitComplete] = usePresence()

  if (stylesToApply && !isPresent) {
    Object.assign(target, stylesToApply)
    return onExitComplete
  }
}
