import type { JSX } from "solid-js"
import type { Options } from "@motionone/dom"
import type {
  MotionEvent,
  VariantDefinition,
  CustomPointerEvent,
  ViewEvent,
} from "@motionone/dom"

export interface MotionEventHandlers {
  onMotionStart?: (event: MotionEvent) => void
  onMotionComplete?: (event: MotionEvent) => void
  onHoverStart?: (event: CustomPointerEvent) => void
  onHoverEnd?: (event: CustomPointerEvent) => void
  onPressStart?: (event: CustomPointerEvent) => void
  onPressEnd?: (event: CustomPointerEvent) => void
  onViewEnter?: (event: ViewEvent) => void
  onViewLeave?: (event: ViewEvent) => void
}

export type ElementTag = keyof JSX.IntrinsicElements

export type MotionComponentProps<T = {}> = T &
  Options &
  MotionEventHandlers & {
    children?: JSX.Element
    style?: JSX.CSSProperties
    exit?: VariantDefinition
  }

export type MotionComponent = {
  // <Motion />
  (props: MotionComponentProps<JSX.IntrinsicElements["div"]>): JSX.Element
  // <Motion tag="div" />
  <T extends ElementTag>(
    props: MotionComponentProps<JSX.IntrinsicElements[T]> & { tag: T }
  ): JSX.Element
}

export type MotionProxyComponent<T> = (
  props: MotionComponentProps<T>
) => JSX.Element

export type MotionProxy = MotionComponent & {
  // <Motion.Div />
  [K in ElementTag as Capitalize<K>]: MotionProxyComponent<
    JSX.IntrinsicElements[K]
  >
}
