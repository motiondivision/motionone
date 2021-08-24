import { AnimationData, getAnimationData } from "./data"
import {
  AnimationOptions,
  AnimationWithCommitStyles,
  ValueKeyframesDefinition,
} from "./types"
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
import { convertEasing, isEasingList } from "./utils/easing"
import { supports } from "./utils/feature-detection"
import { createCssVariableRenderer, createStyleRenderer } from "./utils/apply"
import { animateNumber } from "../js/animate-number"
import { hydrateKeyframes, keyframesList } from "./utils/keyframes"
import { style } from "./style"
import { defaults } from "./utils/defaults"

export function animateStyle(
  element: Element,
  name: string,
  keyframesDefinition: ValueKeyframesDefinition,
  options: AnimationOptions = {}
) {
  // TODO: Merge in defaults
  let {
    duration = defaults.duration,
    delay = defaults.delay,
    endDelay = defaults.endDelay,
    repeat = defaults.repeat,
    easing = defaults.easing,
    direction,
    offset,
  } = options
  const data = getAnimationData(element)
  let canAnimateNatively = supports.waapi()
  let render: (v: any) => void = noop
  const valueIsTransform = isTransform(name)

  /**
   * This fixes a bug in WKWebView (used in iOS apps) where compositor values
   * like opacity and transform won't start animating for a long time after the
   * animation starts, even while other values like color do.
   */
  delay = Math.max(0.00001, delay)

  /**
   * If this is an individual transform, we need to map its
   * key to a CSS variable and update the element's transform style
   */
  if (valueIsTransform) {
    if (transformAlias[name]) name = transformAlias[name]
    addTransformToElement(element as HTMLElement, name)
    name = asTransformCssVar(name)
  }

  /**
   * Get definition of value, this will be used to convert numerical
   * keyframes into the default value type.
   */
  const definition = transformPropertyDefinitions.get(name)

  /**
   * Replace null values with the previous keyframe value, or read
   * it from the DOM if it's the first keyframe.
   *
   * TODO: This needs to come after the valueIsTransform
   * check so it can correctly read the underlying value.
   * Should make a test for this.
   */
  let keyframes = hydrateKeyframes(
    keyframesList(keyframesDefinition),
    element,
    name
  )

  stopCurrentAnimation(data, name)

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
    if (definition) {
      keyframes = keyframes.map((value) =>
        typeof value === "number" ? definition.toDefaultUnit!(value) : value
      )
    }

    if (!supports.partialKeyframes() && keyframes.length === 1) {
      keyframes.unshift(style.get(element, name))
    }

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
        easing: isEasingList(easing) ? easing.map(convertEasing) : undefined,
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
    if (keyframes.length === 1) {
      keyframes.unshift(
        style.get(element, name) || definition?.initialValue || 0
      )
    }

    /**
     * Transform styles are currently only accepted as numbers of
     * their default value type, so here we loop through and map
     * them to numbers.
     */
    keyframes = keyframes.map((value) =>
      typeof value === "string" ? parseFloat(value) : value
    )

    if (definition) {
      const applyStyle = render
      render = (v: number) => applyStyle(definition.toDefaultUnit(v))
    }

    return animateNumber(render, keyframes as any, options)
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