import { addUniqueItem } from "../../../utils/array"
import { noopReturn } from "../../../utils/noop"
import { getAnimationData } from "../data"
import { CssPropertyDefinition, CssPropertyDefinitionMap } from "../types"

/**
 * A list of all transformable axes. We'll use this list to generated a version
 * of each axes for each transform.
 */
export const axes = ["", "X", "Y", "Z"]

/**
 * An ordered array of each transformable value. By default, transform values
 * will be sorted to this order.
 */
const order = ["translate", "scale", "rotate", "skew"]

export const transformAlias = {
  x: "translateX",
  y: "translateY",
  z: "translateZ",
}

const rotation: CssPropertyDefinition = {
  syntax: "<angle>",
  initialValue: "0deg",
  toDefaultUnit: (v: number) => v + "deg",
}

const baseTransformProperties: CssPropertyDefinitionMap = {
  translate: {
    syntax: "<length-percentage>",
    initialValue: "0px",
    toDefaultUnit: (v: number) => v + "px",
  },
  rotate: rotation,
  scale: {
    syntax: "<number>",
    initialValue: 1,
    toDefaultUnit: noopReturn,
  },
  skew: rotation,
}

export const transformPropertyDefinitions = new Map<
  string,
  CssPropertyDefinition
>()

export const asTransformCssVar = (name: string) => `--motion-${name}`

/**
 * Generate a list of every possible transform key
 */
const transforms = ["x", "y", "z"]
order.forEach((name) => {
  axes.forEach((axis) => {
    transforms.push(name + axis)

    transformPropertyDefinitions.set(
      asTransformCssVar(name + axis),
      baseTransformProperties[name]
    )
  })
})

/**
 * A function to use with Array.sort to sort transform keys by their default order.
 */
export function compareTransformOrder(a: string, b: string) {
  return transforms.indexOf(a) - transforms.indexOf(b)
}

/**
 * Provide a quick way to check if a string is the name of a transform
 */
const transformLookup = new Set(transforms)
export const isTransform = (name: string) => transformLookup.has(name)

export const addTransformToElement = (element: HTMLElement, name: string) => {
  const { activeTransforms } = getAnimationData(element)
  addUniqueItem(activeTransforms, name)

  element.style.transform = buildTransformTemplate(activeTransforms)
}

export const buildTransformTemplate = (activeTransforms: string[]): string =>
  activeTransforms
    .sort(compareTransformOrder)
    .reduce(transformListToString, "")
    .trim()

const transformListToString = (template: string, name: string) =>
  `${template} ${name}(var(${asTransformCssVar(name)}))`
