import { createContext } from "solid-js"
import { MotionState } from "@motionone/dom"

export const ParentStateContext = createContext<MotionState>()

export const OngoingStateContext =
  createContext<() => MotionState | undefined>()

export const UnmountContext = createContext<(fn: VoidFunction) => void>()
