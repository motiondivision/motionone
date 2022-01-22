import type {
  AnimationListOptions,
  AnimationOptionsWithOverrides,
} from "../types"
import type { AnimationOptions } from "@motionone/types"

export const getOptions = (
  options: AnimationOptionsWithOverrides | AnimationListOptions,
  key: string
): AnimationOptions =>
  /**
   * TODO: Make test for this
   * Always return a new object otherwise delay is overwritten by results of stagger
   * and this results in no stagger
   */
  options[key] ? { ...options, ...options[key] } : { ...options }
