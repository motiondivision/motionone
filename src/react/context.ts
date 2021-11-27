import { createContext } from "react"
import { MotionState } from "../dom/state/types"

export const MotionContext = createContext<MotionState | undefined>(undefined)
