import type { AnimationOptionsWithOverrides, MotionKeyframes } from "../types"

export interface AnimatedElement {
  mount: (element: Element) => void
  update: (poses: Poses, options: PoserOptions) => void
  addChild: (child: AnimatedElement) => () => void
  getDepth: () => number
}

export type Pose = MotionKeyframes & {
  options?: AnimationOptionsWithOverrides
}

export type PoseDefinition = string | Pose

export type Poses = {
  [key: string]: PoseDefinition
}

export interface Poser {
  update: (poses: Poses, options: PoserOptions) => void
  clear: () => void
}

export type PoserOptions = AnimationOptionsWithOverrides

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

export type PoseEventNames =
  | "posestart"
  | "posecomplete"
  | "hoverstart"
  | "hoverend"
  | "pressstart"
  | "pressend"
  | "viewenter"
  | "viewleave"

type PoseEvent = CustomEvent<{
  target: Pose
}>

type CustomPointerEvent = CustomEvent<{
  originalEvent: PointerEvent
}>

type ViewEvent = CustomEvent<{
  originalEntry: IntersectionObserverEntry
}>

declare global {
  interface GlobalEventHandlersEventMap {
    posestart: PoseEvent
    posecomplete: PoseEvent
    hoverstart: CustomPointerEvent
    hoverend: CustomPointerEvent
    pressstart: CustomPointerEvent
    pressend: CustomPointerEvent
    viewenter: ViewEvent
    viewleave: ViewEvent
  }
}
