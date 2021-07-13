import { AnimationOptions, AnimationOptionsWithOverrides } from "../types"

export const getOptions = (
  options: AnimationOptionsWithOverrides,
  key: string
): AnimationOptions =>
  options[key] ? { ...options, ...options[key] } : options
