import { cssVar } from "./css-variables"
import { getAnimationMetadata } from "./metadata"
import { Keyframe } from "./types"

const supportsCustomCssProperties =
  typeof (CSS as any).registerProperty !== "undefined"

const transformSyntax = {
  x: "<length-percentage>",
  y: "<length-percentage>",
  z: "<length>",
  scale: "<number>",
  scaleX: "<number>",
  scaleY: "<number>",
  scaleZ: "<number>",
  rotateX: "<angle> | <zero>",
  rotateZ: "<angle> | <zero>",
  rotateY: "<angle> | <zero>",
}

const axes = new Set(["x", "y", "z"])

function getRegisteredValues() {
  // This is weird but it's to prevent calling registerProperty twice on the same variable
  // in hot module reloading environments
  if (!(window as any).__motionVars) {
    ;(window as any).__motionVars = new Set()
  }
  return (window as any).__motionVars as Set<string>
}

function registerCSSProperty(key: string) {
  const registered = getRegisteredValues()
  if (registered.has(key)) return

  registered.add(key)
  ;(CSS as any).registerProperty({
    name: cssVar(key),
    inherits: false,
    syntax: transformSyntax[key],
    initialValue: key.includes("scale") ? 1 : 0,
  })
}

function functionName(key: string) {
  return axes.has(key) ? `translate${key.toUpperCase()}` : key
}

function createTransform(keys: string[]) {
  return keys
    .map((key) => `${functionName(key)}(var(${cssVar(key)})) `)
    .join(" ")
}

export function mapTransformsToVariables(
  element: Element,
  keyframeDefinition: Keyframe | Keyframe[]
): Keyframe | Keyframe[] {
  if (!supportsCustomCssProperties) return keyframeDefinition

  const data = getAnimationMetadata(element)

  const keyframes = Array.isArray(keyframeDefinition)
    ? keyframeDefinition
    : [keyframeDefinition]

  const keyframesWithVariables = keyframes.map((keyframe) => {
    const newKeyframe: Keyframe = {}
    for (const key in keyframe) {
      if (transformSyntax[key]) {
        if (data.transformKeys.indexOf(key) === -1) {
          data.transformKeys.push(key)
          registerCSSProperty(key)
        }
        newKeyframe[cssVar(key)] = keyframe[key]
      } else {
        newKeyframe[key] = keyframe[key]
      }
    }

    return newKeyframe
  })

  /**
   * Create a transform string that will insert the transform CSS variables
   * in the default order.
   */
  if (data.transformKeys.length) {
    const transform = createTransform(data.transformKeys)
    if (transform !== data.transform) {
      ;(element as HTMLElement).style.transform = data.transform = transform
    }
  }

  return keyframesWithVariables
}
