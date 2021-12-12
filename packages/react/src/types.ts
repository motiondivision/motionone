import type {
  CSSProperties,
  DetailedHTMLFactory,
  ForwardRefExoticComponent,
  HTMLAttributes,
  PropsWithoutRef,
  ReactHTML,
  RefAttributes,
  SVGAttributes,
} from "react"
import { Options } from "@motionone/dom"
import type { svgElements, htmlElements } from "./utils/supported-elements"

export interface ElementProps {
  style: CSSProperties
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

type HTMLAttributesWithoutMotionProps<
  Attributes extends HTMLAttributes<Element>,
  Element extends HTMLElement
> = { [K in Exclude<keyof Attributes, keyof Options>]?: Attributes[K] }

/**
 * @public
 */
export type MotionHTMLProps<
  TagName extends keyof ReactHTML
> = HTMLAttributesWithoutMotionProps<
  UnwrapFactoryAttributes<ReactHTML[TagName]>,
  UnwrapFactoryElement<ReactHTML[TagName]>
> &
  Options

/**
 * Motion-optimised versions of React's HTML components.
 *
 * @public
 */
export type MotionHTMLComponents = {
  [K in HTMLElements]: ForwardRefComponent<
    UnwrapFactoryElement<ReactHTML[K]>,
    MotionHTMLProps<K>
  >
}

interface SVGAttributesWithoutOptions<T>
  extends Pick<
    SVGAttributes<T>,
    Exclude<keyof SVGAttributes<T>, keyof Options>
  > {}

type UnwrapSVGFactoryElement<F> = F extends React.SVGProps<infer P> ? P : never

/**
 * @public
 */
export interface MotionSVGProps<T>
  extends SVGAttributesWithoutOptions<T>,
    Options {}

/**
 * Motion-optimised versions of React's SVG components.
 *
 * @public
 */
export type MotionSVGComponents = {
  [K in SVGElements]: ForwardRefComponent<
    UnwrapSVGFactoryElement<JSX.IntrinsicElements[K]>,
    MotionSVGProps<UnwrapSVGFactoryElement<JSX.IntrinsicElements[K]>>
  >
}

export type MotionDOMComponents = MotionHTMLComponents & MotionSVGComponents
