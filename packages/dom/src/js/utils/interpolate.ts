import type { EasingFunction } from "../types"
import { mix } from "../../utils/mix"
import { noopReturn } from "../../utils/noop"
import { progress } from "../../utils/progress"
import { getEasingForSegment } from "./get-easing"
import { defaultOffset, fillOffset } from "./offset"

const clampProgress = (p: number) => Math.min(1, Math.max(p, 0))

export function slowInterpolateNumbers(
  output: number[],
  input: number[] = defaultOffset(output.length),
  easing: EasingFunction | EasingFunction[] = noopReturn
) {
  const length = output.length

  /**
   * If the input length is lower than the output we
   * fill the input to match. This currently assumes the input
   * is an animation progress value so is a good candidate for
   * moving outside the function.
   */
  const remainder = length - input.length
  remainder > 0 && fillOffset(input, remainder)

  return (t: number) => {
    let i = 0
    for (; i < length - 2; i++) {
      if (t < input[i + 1]) break
    }

    let progressInRange = clampProgress(progress(input[i], input[i + 1], t))
    const segmentEasing = getEasingForSegment(easing, i)
    progressInRange = segmentEasing(progressInRange)

    return mix(output[i], output[i + 1], progressInRange)
  }
}
