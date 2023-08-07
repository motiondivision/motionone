import type { JSX, ParentProps } from "solid-js"
import type { PropertiesHyphen } from "csstype"
import type { Options as DomOptions, VariantDefinition } from "@motionone/dom"
import type { MotionEvent, CustomPointerEvent, ViewEvent } from "@motionone/dom"

export type { VariantDefinition }

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

/*
  Solid style attribute supports only kebab-case properties.
  While @motionone/dom supports both camelCase and kebab-case,
  but provides only camelCase properties in the types.
*/
declare module "@motionone/dom" {
  interface CSSStyleDeclarationWithTransform
    extends Omit<PropertiesHyphen, "direction" | "transition"> {}
}

export type Options = DomOptions & { exit?: VariantDefinition }

export type MotionComponentProps = ParentProps<MotionEventHandlers & Options>

export type MotionComponent = {
  // <Motion />
  (props: JSX.IntrinsicElements["div"] & MotionComponentProps): JSX.Element
  // <Motion tag="div" />
  <T extends keyof JSX.IntrinsicElements>(
    props: JSX.IntrinsicElements[T] & MotionComponentProps & { tag: T }
  ): JSX.Element
}

export type MotionProxyComponent<T> = (
  props: T & MotionComponentProps
) => JSX.Element

export type MotionProxy = MotionComponent & {
  // <Motion.div />
  [K in keyof JSX.IntrinsicElements]: MotionProxyComponent<
    JSX.IntrinsicElements[K]
  >
}

declare module "solid-js" {
  namespace JSX {
    interface Directives {
      motion: Options
    }
  }
}

// export only here so the `JSX` import won't be shaken off the tree:
export type E = JSX.Element
