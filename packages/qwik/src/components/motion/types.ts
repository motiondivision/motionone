import { QRL } from "@builder.io/qwik"
import { type JSX } from "@builder.io/qwik/jsx-runtime"
import type {
  AnimationOptions,
  UnresolvedValueKeyframe,
  ValueKeyframe,
} from "@motionone/types"

export type MotionProxy = MotionComponent & {
  // <Motion.div />
  [K in keyof JSX.IntrinsicElements]: MotionProxyComponent<
    JSX.IntrinsicElements[K]
  >
}

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

export type MotionComponentProps = MotionEventHandlers & Options

export interface MotionEventHandlers {
  onMotionStart$?: QRL<(event?: MotionEvent) => void>
  onMotionComplete$?: QRL<(event?: MotionEvent) => void>
  onClick$?: QRL<(event?: CustomPointerEvent) => void>
  onHoverStart$?: QRL<(event?: CustomPointerEvent) => void>
  onHoverEnd$?: QRL<(event?: CustomPointerEvent) => void>
  onPressStart$?: QRL<(event?: CustomPointerEvent) => void>
  onPressEnd$?: QRL<(event?: CustomPointerEvent) => void>
  onViewEnter$?: QRL<(event?: ViewEvent) => void>
  onViewLeave$?: QRL<(event?: ViewEvent) => void>
}

export type MotionEvent = CustomEvent<{
  target: Variant
}>

export type Variant = MotionKeyframesDefinition & {
  transition?: AnimationOptionsWithOverrides
}

export type Options = {
  initial?: false | VariantDefinition
  animate?: VariantDefinition
  inView?: VariantDefinition
  hover?: VariantDefinition
  press?: VariantDefinition
  exit?: VariantDefinition
  variants?: Record<string, Variant>
  inViewOptions?: InViewOptions
  transition?: AnimationOptionsWithOverrides
}

export interface InViewOptions {
  root?: Element | Document
  margin?: string
  amount?: "any" | "all" | number
}

export type VariantDefinition = Variant | string

export interface Variants {
  [key: string]: Variant
}

export type AnimationOptionsWithOverrides = StyleAnimationOptions &
  VariableAnimationOptions &
  AnimationOptions

export type StyleAnimationOptions = {
  [K in keyof CSSStyleDeclarationWithTransform]?: AnimationOptions
}

export type VariableAnimationOptions = {
  [key: `--${string}`]: AnimationOptions
}

export type MotionKeyframesDefinition = StyleKeyframesDefinition &
  VariableKeyframesDefinition

export type VariableKeyframesDefinition = {
  [key: `--${string}`]: ValueKeyframesDefinition
}

export type ValueKeyframesDefinition =
  | ValueKeyframe
  | ValueKeyframe[]
  | UnresolvedValueKeyframe[]

export type StyleKeyframesDefinition = {
  [K in keyof CSSStyleDeclarationWithTransform]?: ValueKeyframesDefinition
}

export interface CSSStyleDeclarationWithTransform
  extends Omit<CSSStyleDeclaration, "direction" | "transition"> {
  x: number | string
  y: number | string
  z: number | string
  rotateX: number | string
  rotateY: number | string
  rotateZ: number | string
  scaleX: number
  scaleY: number
  scaleZ: number
  skewX: number | string
  skewY: number | string
}

export type CustomPointerEvent = CustomEvent<{
  originalEvent: PointerEvent
}>

export type ViewEvent = CustomEvent<{
  originalEntry: IntersectionObserverEntry
}>
