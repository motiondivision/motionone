import { AnimationData, getAnimationData } from "./data"
import { AnimationOptions, AnimationWithCommitStyles } from "./types"
import { isCssVar, registerCssVariable } from "./utils/css-var"
import { noop } from "../../utils/noop"
import { ms } from "./utils/time"
import {
  addTransformToElement,
  asTransformCssVar,
  isTransform,
  transformAlias,
  transformPropertyDefinitions,
} from "./utils/transforms"
import { stopAnimation } from "./utils/stop-animation"
import { convertEasing, convertEasingList, isEasingList } from "./utils/easing"
import { isAnimationGenerator } from "../../generators"
import { supports } from "./utils/feature-detection"
import { createCssVariableRenderer, createStyleRenderer } from "./utils/apply"

export function animateValue(
  element: Element,
  name: string,
  keyframes: string | number | Array<string | number>,
  options: AnimationOptions = {}
) {
  let {
    duration = 0.3,
    delay = 0,
    endDelay = 0,
    repeat = 0,
    easing = "ease",
    direction,
    offset,
  } = options
  const data = getAnimationData(element)
  let canAnimateNatively = supports.waapi()
  let render: (v: any) => void = noop
  const valueIsTransform = isTransform(name)

  keyframes = Array.isArray(keyframes) ? keyframes : [keyframes]

  /**
   * If this is an individual transform, we need to map its
   * key to a CSS variable and update the element's transform style
   */
  if (valueIsTransform) {
    if (transformAlias[name]) name = transformAlias[name]
    addTransformToElement(element as HTMLElement, name)
    name = asTransformCssVar(name)
  }

  stopCurrentAnimation(data, name)

  /**
   * Check if this is an animation pregenerator and generate keyframes
   * if so.
   */
  if (isAnimationGenerator(easing)) {
    const generatedAnimation = easing.generate(keyframes)
    easing = "linear"

    if (generatedAnimation !== false) {
      keyframes = generatedAnimation.keyframes
      duration = generatedAnimation.duration
    }
  }

  /**
   * Convert numbers to default value types. Currently this only supports
   * transforms but it could also support other value types.
   */
  const definition = transformPropertyDefinitions.get(name)
  if (definition && definition.toDefaultUnit) {
    keyframes = keyframes.map((value) =>
      typeof value === "number" ? definition.toDefaultUnit!(value) : value
    )
  }

  /**
   * Use the last keyframe as a target we apply to style at the end of the
   * animation.
   */
  const target = keyframes[keyframes.length - 1]

  /**
   * If this is a CSS variable we need to register it with the browser
   * before it can be animated natively. We also set it with setProperty
   * rather than directly onto the element.style object.
   */
  if (isCssVar(name)) {
    render = createCssVariableRenderer(element, name)

    if (supports.cssRegisterProperty()) {
      registerCssVariable(name)
    } else {
      canAnimateNatively = false
    }
  } else {
    render = createStyleRenderer(element, name)
  }

  /**
   * If we can animate this value with WAAPI, do so. Currently this only
   * feature detects CSS.registerProperty but could check WAAPI too.
   */

  if (canAnimateNatively) {
    if (!supports.partialKeyframes() && keyframes.length === 1) {
      const initialKeyframe = isCssVar(name)
        ? (element as HTMLElement).style.getPropertyValue(name)
        : getComputedStyle(element)[name]
      keyframes.unshift(initialKeyframe)
    }

    const animation = element.animate(
      {
        [name]: keyframes,
        offset,
        easing: isEasingList(easing) ? convertEasingList(easing) : undefined,
      } as PropertyIndexedKeyframes,
      {
        delay: ms(delay),
        duration: ms(duration),
        endDelay: ms(endDelay),
        easing: !isEasingList(easing) ? convertEasing(easing) : undefined,
        direction,
        iterations: repeat + 1,
      }
    ) as AnimationWithCommitStyles

    data.activeAnimations[name] = animation

    animation.finished.then(() => render(target)).catch(noop)

    return animation
  } else {
    render(target)
  }
}

function stopCurrentAnimation(data: AnimationData, name: string) {
  if (data.activeAnimations[name]) {
    stopAnimation(data.activeAnimations[name]!)
    data.activeAnimations[name] = undefined
  }
}
