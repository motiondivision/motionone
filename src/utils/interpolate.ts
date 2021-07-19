import { progress, mixColor, mixComplex } from "popmotion"
import { color } from "style-value-types"
export type Interpolator<T> = (v: number) => T

// TODO Support unit types
function detectMixerFactory<T>(v: T) {
  if (color.test(v)) {
    return mixColor
  } else {
    return mixComplex
  }
}

export function fastInterpolate<T>(
  [from, to]: [number, number],
  output: [T, T]
): Interpolator<T> {
  const mixerFactory = detectMixerFactory(output[0])
  const mixer = (mixerFactory as any)(output[0] as any, output[1] as any)
  return (v: number) => mixer(progress(from, to, v))
}
