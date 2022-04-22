import { createContext } from "solid-js"
import { MotionState } from "@motionone/dom"

export const ParentContext = createContext<{
  state?: MotionState
  root?: () => Element
}>({})

export const PresenceContext = createContext<{
  addCleanup?: (fn: VoidFunction, el: Element) => void
  addMount?: (fn: VoidFunction) => void
  initial: () => boolean
}>({ initial: () => true })
