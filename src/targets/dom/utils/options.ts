import {
  AnimationListOptions,
  AnimationOptions,
  AnimationOptionsWithOverrides,
} from "../types"

export const getOptions = (
  options: AnimationOptionsWithOverrides | AnimationListOptions,
  key: string
): AnimationOptions =>
  options[key] ? { ...options, ...options[key] } : { ...options }
