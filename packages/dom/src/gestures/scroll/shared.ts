import { PresetOffset, ProgressIntersection } from "./types"

export const presetOffsets: Record<
  PresetOffset,
  [ProgressIntersection, ProgressIntersection]
> = {
  enter: [
    [0, 1],
    [1, 1],
  ],
  exit: [
    [0, 0],
    [1, 0],
  ],
  any: [
    [1, 0],
    [0, 1],
  ],
  all: [
    [0, 0],
    [1, 1],
  ],
}
