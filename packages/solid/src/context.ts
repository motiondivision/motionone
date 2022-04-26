import { createContext, onCleanup, onMount } from "solid-js"
import { MotionState } from "@motionone/dom"

export interface PresenceContextState {
  addCleanup: (fn: VoidFunction) => void
  addMount: (fn: VoidFunction) => void
  initial: () => boolean
}

export const defaultPresenceContextState: PresenceContextState = {
  initial: () => true,
  addCleanup: onCleanup,
  addMount: onMount,
}
export const ParentContext = createContext<MotionState>()

export const PresenceContext = createContext<PresenceContextState>(
  defaultPresenceContextState
)
