import {
  CSSProperties,
  DetailedHTMLFactory,
  ForwardRefExoticComponent,
  HTMLAttributes,
  PropsWithoutRef,
  ReactHTML,
  RefAttributes,
  RefObject,
  SVGAttributes,
} from "react"
import { AnimationOptions, MotionKeyframes } from "../dom/types"
import { svgElements, htmlElements } from "./utils/supported-elements"
export type AnimationCallback = (target: MotionKeyframes) => void

export interface CSSPropertiesWithTransform extends CSSProperties {
  x?: number | string
  y?: number | string
  z?: number
  rotateX?: number | string
  rotateY?: number | string
  rotateZ?: number | string
  scaleX?: number
  scaleY?: number
  scaleZ?: number
  skewX?: number
  skewY?: number
}

export type CSSVariables = {
  [key: `--${string}`]: string | number
}

export type MotionCSSProperties = CSSPropertiesWithTransform & CSSVariables

export type Variants = { [key: string]: MotionKeyframes }

export interface ViewportOptions {
  root?: RefObject<Element>
  once?: boolean
  margin?: string
  threshold?: number
}

export interface AnimatedProps {
  initial?: MotionCSSProperties | string
  style?: MotionKeyframes | string
  hover?: MotionKeyframes | string
  press?: MotionKeyframes | string
  exit?: MotionKeyframes | string
  inViewport?: MotionKeyframes | string
  inherit?: boolean
  variants?: Variants
  viewport?: ViewportOptions
  options?: AnimationOptions
  onStart?: AnimationCallback
  onComplete?: AnimationCallback
  onViewportEnter?: (entry: IntersectionObserverEntry) => void
  onViewportLeave?: (entry: IntersectionObserverEntry) => void
}

export type VariantProps = {
  initial?: boolean
  style?: boolean
  hover?: boolean
  press?: boolean
  exit?: boolean
  inViewport?: boolean
}

export type AnimationContextProps = {
  [K in keyof VariantProps]?: string
}

export type VariantActiveState = {
  [K in keyof VariantProps]?: boolean
}

type UnionStringArray<T extends Readonly<string[]>> = T[number]

export type HTMLElements = UnionStringArray<typeof htmlElements>
export type SVGElements = UnionStringArray<typeof svgElements>

/**
 * @public
 */
export type ForwardRefComponent<T, P> = ForwardRefExoticComponent<
  PropsWithoutRef<P> & RefAttributes<T>
>

/**
 * Support for React component props
 */
type UnwrapFactoryAttributes<F> = F extends DetailedHTMLFactory<infer P, any>
  ? P
  : never
type UnwrapFactoryElement<F> = F extends DetailedHTMLFactory<any, infer P>
  ? P
  : never

type HTMLAttributesWithoutAnimatedProps<
  Attributes extends HTMLAttributes<Element>,
  Element extends HTMLElement
> = { [K in Exclude<keyof Attributes, keyof AnimatedProps>]?: Attributes[K] }

/**
 * @public
 */
export type AnimatedHTMLProps<
  TagName extends keyof ReactHTML
> = HTMLAttributesWithoutAnimatedProps<
  UnwrapFactoryAttributes<ReactHTML[TagName]>,
  UnwrapFactoryElement<ReactHTML[TagName]>
> &
  AnimatedProps

/**
 * Motion-optimised versions of React's HTML components.
 *
 * @public
 */
export type AnimatedHTMLComponents = {
  [K in HTMLElements]: ForwardRefComponent<
    UnwrapFactoryElement<ReactHTML[K]>,
    AnimatedHTMLProps<K>
  >
}

interface SVGAttributesWithoutAnimatedProps<T>
  extends Pick<
    SVGAttributes<T>,
    Exclude<keyof SVGAttributes<T>, keyof AnimatedProps>
  > {}

type UnwrapSVGFactoryElement<F> = F extends React.SVGProps<infer P> ? P : never

/**
 * @public
 */
export interface AnimatedSVGProps<T>
  extends SVGAttributesWithoutAnimatedProps<T>,
    AnimatedProps {}

/**
 * Motion-optimised versions of React's SVG components.
 *
 * @public
 */
export type AnimatedSVGComponents = {
  [K in SVGElements]: ForwardRefComponent<
    UnwrapSVGFactoryElement<JSX.IntrinsicElements[K]>,
    AnimatedSVGProps<UnwrapSVGFactoryElement<JSX.IntrinsicElements[K]>>
  >
}

export type AnimatedDOMComponents = AnimatedHTMLComponents &
  AnimatedSVGComponents
