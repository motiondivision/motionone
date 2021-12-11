import { getAnimationData } from "./data"
import type {
  AnimationFactory,
  AnimationOptions,
  ValueKeyframesDefinition,
} from "./types"
import { isCssVar, registerCssVariable } from "./utils/css-var"
import { noop } from "../utils/noop"
import { ms } from "./utils/time"
import {
  addTransformToElement,
  isTransform,
  transformDefinitions,
} from "./utils/transforms"
import { convertEasing, isCustomEasing, isEasingList } from "./utils/easing"
import { supports } from "./utils/feature-detection"
import { cssVariableRenderer, styleRenderer } from "./utils/apply"
import { NumberAnimation } from "../js/NumberAnimation"
import { hydrateKeyframes, keyframesList } from "./utils/keyframes"
import { style } from "./style"
import { defaults } from "./utils/defaults"
import { getStyleName } from "./utils/get-style-name"
import { isNumber } from "../utils/is-number"
import { stopAnimation } from "./utils/stop-animation"

export function animateStyle(
  element: Element,
  key: string,
  keyframesDefinition: ValueKeyframesDefinition,
  options: AnimationOptions = {}
): AnimationFactory {
  let animation: any
  let {
    duration = defaults.duration,
    delay = defaults.delay,
    endDelay = defaults.endDelay,
    repeat = defaults.repeat,
    easing = defaults.easing,
    direction,
    offset,
    allowWebkitAcceleration = false,
  } = options
  const data = getAnimationData(element)
  let canAnimateNatively = supports.waapi()
  let render: (v: any) => void = noop
  const valueIsTransform = isTransform(key)

  /**
   * If this is an individual transform, we need to map its
   * key to a CSS variable and update the element's transform style
   */
  valueIsTransform && addTransformToElement(element as HTMLElement, key)
  const name = getStyleName(key)

  /**
   * Get definition of value, this will be used to convert numerical
   * keyframes into the default value type.
   */
  const definition = transformDefinitions.get(name)

  /**
   * Stop the current animation, if any. Because this will trigger
   * commitStyles (DOM writes) and we might later trigger DOM reads,
   * this is fired now and we return a factory function to create
   * the actual animation that can get called in batch,
   */
  stopAnimation(data.animations[name])

  /**
   * Batchable factory function containing all DOM reads.
   */
  return () => {
    const readInitialValue = () =>
      style.get(element, name) ?? definition?.initialValue ?? 0

    /**
     * Replace null values with the previous keyframe value, or read
     * it from the DOM if it's the first keyframe.
     */
    let keyframes = hydrateKeyframes(
      keyframesList(keyframesDefinition),
      readInitialValue
    )

    if (isCustomEasing(easing)) {
      const custom = easing.createAnimation(
        keyframes,
        readInitialValue as any,
        valueIsTransform,
        name,
        data
      )
      easing = custom.easing
      if (custom.keyframes !== undefined) keyframes = custom.keyframes
      if (custom.duration !== undefined) duration = custom.duration
    }

    /**
     * If this is a CSS variable we need to register it with the browser
     * before it can be animated natively. We also set it with setProperty
     * rather than directly onto the element.style object.
     */
    if (isCssVar(name)) {
      render = cssVariableRenderer(element, name)

      if (supports.cssRegisterProperty()) {
        registerCssVariable(name)
      } else {
        canAnimateNatively = false
      }
    } else {
      render = styleRenderer(element, name)
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
          isNumber(value) ? definition.toDefaultUnit!(value) : value
        )
      }

      /**
       * If this browser doesn't support partial/implicit keyframes we need to
       * explicitly provide one.
       */
      if (!supports.partialKeyframes() && keyframes.length === 1) {
        keyframes.unshift(readInitialValue())
      }

      const animationOptions = {
        delay: ms(delay),
        duration: ms(duration),
        endDelay: ms(endDelay),
        easing: !isEasingList(easing) ? convertEasing(easing) : undefined,
        direction,
        iterations: repeat + 1,
        fill: "both" as FillMode,
      }

      animation = element.animate(
        {
          [name]: keyframes,
          offset,
          easing: isEasingList(easing) ? easing.map(convertEasing) : undefined,
        } as PropertyIndexedKeyframes,
        animationOptions
      )

      /**
       * Polyfill finished Promise in browsers that don't support it
       */
      if (!animation.finished) {
        animation.finished = new Promise((resolve, reject) => {
          animation.onfinish = resolve
          animation.oncancel = reject
        })
      }

      const target = keyframes[keyframes.length - 1]
      animation.finished
        .then(() => {
          // Apply styles to target
          render(target)

          // Ensure fill modes don't persist
          animation.cancel()
        })
        .catch(noop)

      /**
       * This forces Webkit to run animations on the main thread by exploiting
       * this condition:
       * https://trac.webkit.org/browser/webkit/trunk/Source/WebCore/platform/graphics/ca/GraphicsLayerCA.cpp?rev=281238#L1099
       *
       * This fixes Webkit's timing bugs, like accelerated animations falling
       * out of sync with main thread animations and massive delays in starting
       * accelerated animations in WKWebView.
       */
      if (!allowWebkitAcceleration) animation.playbackRate = 1.000001

      /**
       * If we can't animate the value natively then we can fallback to the numbers-only
       * polyfill for transforms. All keyframes must be numerical.
       */
    } else if (valueIsTransform && keyframes.every(isNumber)) {
      /**
       * If we only have a single keyframe, we need to create an initial keyframe by reading
       * the current value from the DOM.
       */
      if (keyframes.length === 1) {
        keyframes.unshift(parseFloat(readInitialValue() as string))
      }

      if (definition) {
        const applyStyle = render
        render = (v: number) => applyStyle(definition.toDefaultUnit(v))
      }

      animation = new NumberAnimation(render, keyframes as any, {
        ...options,
        duration,
        easing,
      })
    } else {
      const target = keyframes[keyframes.length - 1]
      render(
        definition && isNumber(target)
          ? definition.toDefaultUnit(target)
          : target
      )
    }

    data.animations[name] = animation

    /**
     * When an animation finishes, delete the reference to the previous animation.
     */
    animation?.finished
      .then(() => {
        data.animations[name] = undefined
        data.generators[name] = undefined
        data.prevGeneratorState[name] = undefined
      })
      .catch(noop)

    return animation
  }
}
