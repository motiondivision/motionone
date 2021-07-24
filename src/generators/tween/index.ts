import { mix, progress } from "popmotion"
import { AnimationOptions } from "../../targets/dom/types"

export function defaultOffset(values: any[]): number[] {
  const numValues = values.length
  return values.map((_value: number, i: number): number =>
    i !== 0 ? i / (numValues - 1) : 0
  )
}

export function slowInterpolateNumbers(
  output: number[],
  { duration = 0.3, offset = defaultOffset(output) }: AnimationOptions
) {
  const length = output.length
  if (offset.length !== length) {
    // TODO: Pad remaining offset array with evenly-spaced keyframes
  }

  return (t: number) => {
    t = progress(0, duration, t)
    t = Math.min(1, Math.max(t, 0))

    let i = 0
    for (; i < length - 2; i++) {
      if (t >= offset[i] && t < offset[i + 1]) break
    }

    const progressInRange = progress(offset[i], offset[i + 1], t)
    return mix(output[i], output[i + 1], progressInRange)
  }
}
