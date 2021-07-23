import {
  CSSProperties,
  DetailedHTMLFactory,
  ForwardRefExoticComponent,
  HTMLAttributes,
  PropsWithoutRef,
  ReactHTML,
  RefAttributes,
  SVGAttributes,
} from "react"
import { AnimationOptions, MotionKeyframes } from "../dom/types"

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

export interface AnimatedProps {
  initial?: MotionCSSProperties
  style?: MotionKeyframes
  hover?: MotionKeyframes
  press?: MotionKeyframes
  exit?: MotionKeyframes
  options?: AnimationOptions
  onStart?: AnimationCallback
  onComplete?: AnimationCallback
}

type UnionStringArray<T extends Readonly<string[]>> = T[number]

/**
 * @internal
 */
export const htmlElements = [
  "a",
  "abbr",
  "address",
  "area",
  "article",
  "aside",
  "audio",
  "b",
  "base",
  "bdi",
  "bdo",
  "big",
  "blockquote",
  "body",
  "br",
  "button",
  "canvas",
  "caption",
  "cite",
  "code",
  "col",
  "colgroup",
  "data",
  "datalist",
  "dd",
  "del",
  "details",
  "dfn",
  "dialog",
  "div",
  "dl",
  "dt",
  "em",
  "embed",
  "fieldset",
  "figcaption",
  "figure",
  "footer",
  "form",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "head",
  "header",
  "hgroup",
  "hr",
  "html",
  "i",
  "iframe",
  "img",
  "input",
  "ins",
  "kbd",
  "keygen",
  "label",
  "legend",
  "li",
  "link",
  "main",
  "map",
  "mark",
  "menu",
  "menuitem",
  "meta",
  "meter",
  "nav",
  "noscript",
  "object",
  "ol",
  "optgroup",
  "option",
  "output",
  "p",
  "param",
  "picture",
  "pre",
  "progress",
  "q",
  "rp",
  "rt",
  "ruby",
  "s",
  "samp",
  "script",
  "section",
  "select",
  "small",
  "source",
  "span",
  "strong",
  "style",
  "sub",
  "summary",
  "sup",
  "table",
  "tbody",
  "td",
  "textarea",
  "tfoot",
  "th",
  "thead",
  "time",
  "title",
  "tr",
  "track",
  "u",
  "ul",
  "var",
  "video",
  "wbr",
  "webview",
] as const
export type HTMLElements = UnionStringArray<typeof htmlElements>

/**
 * @internal
 */
export const svgElements = [
  "animate",
  "circle",
  "defs",
  "desc",
  "ellipse",
  "g",
  "image",
  "line",
  "filter",
  "marker",
  "mask",
  "metadata",
  "path",
  "pattern",
  "polygon",
  "polyline",
  "rect",
  "stop",
  "svg",
  "switch",
  "symbol",
  "text",
  "tspan",
  "use",
  "view",
  "clipPath",
  "feBlend",
  "feColorMatrix",
  "feComponentTransfer",
  "feComposite",
  "feConvolveMatrix",
  "feDiffuseLighting",
  "feDisplacementMap",
  "feDistantLight",
  "feDropShadow",
  "feFlood",
  "feFuncA",
  "feFuncB",
  "feFuncG",
  "feFuncR",
  "feGaussianBlur",
  "feImage",
  "feMerge",
  "feMergeNode",
  "feMorphology",
  "feOffset",
  "fePointLight",
  "feSpecularLighting",
  "feSpotLight",
  "feTile",
  "feTurbulence",
  "foreignObject",
  "linearGradient",
  "radialGradient",
  "textPath",
] as const
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
