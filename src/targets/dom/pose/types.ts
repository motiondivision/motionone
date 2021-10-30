import { AnimationOptionsWithOverrides, MotionKeyframes } from "../types"

export type Pose = MotionKeyframes & {
  options?: AnimationOptionsWithOverrides
}

export type PoseDefinition = string | Pose

export type Poses = {
  [key: string]: PoseDefinition
}

export type GestureStateHandler = {
  enable: () => void
  disable: () => void
}

export type RemoveGestureHandler = () => void

export type GestureHandler = (
  element: Element,
  stateHandler: GestureStateHandler
) => RemoveGestureHandler

export interface GestureSubscriptions {
  [key: string]: undefined | RemoveGestureHandler
}

export interface Target {
  [key: string]: string | number
}
