import { mix, progress, wrap } from "popmotion"
import { noopReturn } from "../../../utils/noop"
import { EasingFunction } from "../types"

const clampProgress = (p: number) => Math.min(1, Math.max(p, 0))

export function fillOffset(offset: number[], remaining: number) {
  const min = offset[offset.length - 1]
  for (let i = 1; i <= remaining; i++) {
    const offsetProgress = progress(0, remaining, i)
    offset.push(mix(min, 1, offsetProgress))
  }
}

export function defaultOffset(length: number): number[] {
  const offset = [0]
  fillOffset(offset, length - 1)
  return offset
}

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

    if (Array.isArray(easing)) {
      const easingIndex = wrap(0, easing.length - 1, i)
      progressInRange = easing[easingIndex](progressInRange)
    } else {
      progressInRange = easing(progressInRange)
    }

    return mix(output[i], output[i + 1], progressInRange)
  }
}
