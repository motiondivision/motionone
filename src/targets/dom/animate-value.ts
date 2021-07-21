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
import { stop } from "./utils/stop-animation"
import { convertEasing, convertEasingList, isEasingList } from "./utils/easing"
import { isAnimationGenerator } from "../../generators"
import { supports } from "./utils/feature-detection"

/**
 * TODO:
 * - Detect WAAPI support and set default canAnimateNatively
 */
export function animateValue(
  element: Element,
  name: string,
  keyframes: string | number | Array<string | number>,
  {
    duration = 0.3,
    delay = 0,
    endDelay = 0,
    repeat = 0,
    easing = "ease",
    direction,
    offset,
  }: AnimationOptions = {}
) {
  const data = getAnimationData(element)
  let canAnimateNatively = true
  let finalFrame = noop

  keyframes = Array.isArray(keyframes) ? keyframes : [keyframes]

  /**
   * If this is an individual transform, we need to map its
   * key to a CSS variable and update the element's transform style
   */
  if (isTransform(name)) {
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
    finalFrame = () =>
      (element as HTMLElement).style.setProperty(name, target as string)

    if (supports.cssRegisterProperty) {
      registerCssVariable(name)
    } else {
      canAnimateNatively = false
    }
  } else {
    finalFrame = () => ((element as HTMLElement).style[name] = target)
  }

  /**
   * If we can animate this value with WAAPI, do so. Currently this only
   * feature detects CSS.registerProperty but could check WAAPI too.
   */
  if (canAnimateNatively) {
    /**
     * If this browser doesn't support partial keyframes we need to read the
     * property from the DOM. A similar technique could be used to support
     * null as the first keyframe Framer Motion-style
     */
    if (!supports.partialKeyframes && keyframes.length === 1) {
      keyframes.unshift(getComputedStyle(element)[name])
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

    animation.finished.then(finalFrame).catch(noop)

    return animation
  } else {
    finalFrame()
  }
}

function stopCurrentAnimation(data: AnimationData, name: string) {
  if (data.activeAnimations[name]) {
    stop(data.activeAnimations[name]!)
    data.activeAnimations[name] = undefined
  }
}
