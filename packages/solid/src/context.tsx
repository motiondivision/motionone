import { createContext } from "solid-js"
import { MotionState } from "@motionone/dom"

export const ParentStateContext = createContext<MotionState>()

export const PresenceContext = createContext<{
  cleanup?: (fn: VoidFunction) => void
  mount?: (fn: VoidFunction) => void
  initial: () => boolean
}>({ initial: () => true })
