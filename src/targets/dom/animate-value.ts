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
import { supports } from "./utils/feature-detection"
import { createCssVariableRenderer, createStyleRenderer } from "./utils/apply"
import { Animation } from "../js/Animation"

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
  // if (isAnimationGenerator(easing)) {
  //   const generatedAnimation = easing.generate(keyframes)
  //   easing = "linear"

  //   if (generatedAnimation !== false) {
  //     keyframes = generatedAnimation.keyframes
  //     duration = generatedAnimation.duration
  //   }
  // }

  /**
   * Get definition of value, this will be used to convert numerical
   * keyframes into the default value type.
   */
  const definition = transformPropertyDefinitions.get(name)

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
    /**
     * Convert numbers to default value types. Currently this only supports
     * transforms but it could also support other value types.
     */
    if (definition && definition.toDefaultUnit) {
      keyframes = keyframes.map((value) =>
        typeof value === "number" ? definition.toDefaultUnit!(value) : value
      )
    }

    if (!supports.partialKeyframes() && keyframes.length === 1) {
      const initialKeyframe = isCssVar(name)
        ? (element as HTMLElement).style.getPropertyValue(name)
        : getComputedStyle(element)[name]
      keyframes.unshift(initialKeyframe)
    }

    /**
     * TODO: Delete delay and endDelay if they're zero
     */
    const animationOptions = {
      delay: ms(delay),
      duration: ms(duration),
      endDelay: ms(endDelay),
      easing: !isEasingList(easing) ? convertEasing(easing) : undefined,
      direction,
      iterations: repeat + 1,
    }

    const animation = element.animate(
      {
        [name]: keyframes,
        offset,
        easing: isEasingList(easing) ? convertEasingList(easing) : undefined,
      } as PropertyIndexedKeyframes,
      animationOptions
    ) as AnimationWithCommitStyles

    data.activeAnimations[name] = animation

    /**
     * Polyfill finished Promise in browsers that don't support it
     */
    if (!animation.finished) {
      ;(animation as any).finished = new Promise((resolve, reject) => {
        animation.onfinish = resolve
        animation.oncancel = reject
      })
    }

    const target = keyframes[keyframes.length - 1]
    animation.finished.then(() => render(target)).catch(noop)

    return animation
  } else if (valueIsTransform && keyframes.every(isNumber)) {
    return new Animation(render, keyframes, options)
  } else {
    const target = keyframes[keyframes.length - 1]
    render(
      definition && typeof target === "number"
        ? definition.toDefaultUnit(target)
        : target
    )
  }
}

function stopCurrentAnimation(data: AnimationData, name: string) {
  if (data.activeAnimations[name]) {
    stopAnimation(data.activeAnimations[name]!)
    data.activeAnimations[name] = undefined
  }
}

const isNumber = (value: string | number): value is number =>
  typeof value === "number"
