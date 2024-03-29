import type { EasingFunction } from "./types"
import { clamp } from "@motionone/utils"

/*
  Create stepped version of 0-1 progress

  @param [int]: Number of steps
  @param [number]: Current value
  @return [number]: Stepped value
*/
export type Direction = "start" | "end"

export const steps =
  (steps: number, direction: Direction = "end"): EasingFunction =>
  (progress: number) => {
    progress =
      direction === "end"
        ? Math.min(progress, 0.999)
        : Math.max(progress, 0.001)
    const expanded = progress * steps
    const rounded =
      direction === "end" ? Math.floor(expanded) : Math.ceil(expanded)

    return clamp(0, 1, rounded / steps)
  }
