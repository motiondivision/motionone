import type { JSX } from "solid-js"
import type {
  ValueKeyframesDefinition,
  MotionKeyframesDefinition,
} from "@motionone/dom"
import type { MotionEvent, CustomPointerEvent, ViewEvent } from "@motionone/dom"
import { AnimationOptions } from "@motionone/types"

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

export type SolidCSSPropertyKeys = Exclude<
  keyof {
    [K in keyof JSX.CSSProperties as string extends K ? never : K]: never
  },
  "transition"
>

export type KeyframesDefinition = MotionKeyframesDefinition & {
  [K in SolidCSSPropertyKeys]?: ValueKeyframesDefinition
}

export type Variant = KeyframesDefinition & {
  transition?: AnimationOptionsWithOverrides
}

export type VariantDefinition = string | Variant

export type AnimationOptionsWithOverrides = AnimationOptions & {
  [K in keyof KeyframesDefinition]: AnimationOptions
}

export type Options = {
  initial?: false | VariantDefinition
  animate?: VariantDefinition
  inView?: VariantDefinition
  hover?: VariantDefinition
  press?: VariantDefinition
  exit?: VariantDefinition
  variants?: Record<string, Variant>
  transition?: AnimationOptionsWithOverrides
}

export type MotionComponentProps<T = {}> = Omit<T, "style"> &
  MotionEventHandlers &
  Options & {
    children?: JSX.Element
    style?: JSX.CSSProperties
  }

export type MotionComponent = {
  // <Motion />
  (props: MotionComponentProps<JSX.IntrinsicElements["div"]>): JSX.Element
  // <Motion tag="div" />
  <T extends keyof JSX.IntrinsicElements>(
    props: MotionComponentProps<JSX.IntrinsicElements[T]> & { tag: T }
  ): JSX.Element
}

export type MotionProxyComponent<T> = (
  props: MotionComponentProps<T>
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
