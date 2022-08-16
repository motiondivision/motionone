import type { CssPropertyDefinition, CssPropertyDefinitionMap } from "../types"
import { addUniqueItem, noopReturn } from "@motionone/utils"
import { getAnimationData } from "../data"

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

export const transformDefinitions = new Map<string, CssPropertyDefinition>()

export const asTransformCssVar = (name: string) => `--motion-${name}`

/**
 * Generate a list of every possible transform key
 */
const transforms = ["x", "y", "z"]
order.forEach((name) => {
  axes.forEach((axis) => {
    transforms.push(name + axis)

    transformDefinitions.set(
      asTransformCssVar(name + axis),
      baseTransformProperties[name]
    )
  })
})

/**
 * A function to use with Array.sort to sort transform keys by their default order.
 */
export const compareTransformOrder = (a: string, b: string) =>
  transforms.indexOf(a) - transforms.indexOf(b)

/**
 * Provide a quick way to check if a string is the name of a transform
 */
const transformLookup = new Set(transforms)
export const isTransform = (name: string) => transformLookup.has(name)

export const addTransformToElement = (element: HTMLElement, name: string) => {
  // Map x to translateX etc
  if (transformAlias[name]) name = transformAlias[name]

  const { transforms } = getAnimationData(element)
  addUniqueItem(transforms, name)
  console.log(transforms, element)
  /**
   * TODO: An optimisation here could be to cache the transform in element data
   * and only update if this has changed.
   */
  element.style.transform = buildTransformTemplate(transforms)
}

export const buildTransformTemplate = (transforms: string[]): string =>
  transforms
    .sort(compareTransformOrder)
    .reduce(transformListToString, "")
    .trim()

const transformListToString = (template: string, name: string) =>
  `${template} ${name}(var(${asTransformCssVar(name)}))`
