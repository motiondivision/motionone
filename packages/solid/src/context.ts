import { createContext } from "solid-js"
import { MotionState } from "@motionone/dom"

export const ParentContext = createContext<MotionState>()

export const PresenceContext = createContext<{
  addCleanup?: (fn: VoidFunction) => void
  addMount?: (fn: VoidFunction) => void
  initial: () => boolean
}>({ initial: () => true })
