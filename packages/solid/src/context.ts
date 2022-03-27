import { createContext } from "solid-js";
import { MotionState } from "@motionone/dom";

export const MotionContext = createContext<MotionState | undefined>(undefined);
