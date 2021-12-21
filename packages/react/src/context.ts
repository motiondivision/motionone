import { createContext } from "react"
import { MotionState } from "@motionone/dom"

export const MotionContext = createContext<MotionState | undefined>(undefined)
