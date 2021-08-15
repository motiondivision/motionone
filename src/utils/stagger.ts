import { Easing } from "../targets/dom/types"
import { EasingFunction } from "../targets/js/types"

export type StaggerOptions = {
  easing?: EasingFunction | Easing
  direction?: "normal" | "reverse"
}

export type OptionResolver<T> = (i: number, total: number) => T

export function stagger(
  duration: number,
  _options: StaggerOptions = {}
): OptionResolver<number> {
  return (i: number, _total: number) => {
    return duration * i
  }
}

export function resolveOption<T>(
  option: T | OptionResolver<T>,
  i: number,
  total: number
) {
  return typeof option === "function"
    ? (option as OptionResolver<T>)(i, total)
    : option
}
