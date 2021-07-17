import { progress } from "popmotion"
import { color } from "style-value-types"
import { invariant } from "hey-listen"
export type Interpolator<T> = (v: number) => T

function detectMixerFactory<T>(v: T) {
  // if (typeof v === 'number') {
  //   return mixNumber;
  // } else

  // TODO Support unit types
  if (color.test(v)) {
    // return mixColor
  } else {
    // return mixComplex
  }

  invariant(true, "sdadjhsd a kjdas  dsda sd asds d")
}

export function fastInterpolate<T>(
  [from, to]: number[],
  output: T[]
): Interpolator<T> {
  const mixerFactory = detectMixerFactory(output[0])
  const mixer = (mixerFactory as any)(output[0] as any, output[1] as any)
  return (v: number) => mixer(progress(from, to, v))
}
