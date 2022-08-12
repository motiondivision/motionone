import { getAnimationData, getMotionValue } from "./data"
import type { AnimationFactory, ValueKeyframesDefinition } from "./types"
import { isCssVar, registerCssVariable } from "./utils/css-var"
import { Animation } from "@motionone/animation"
import {
  defaults,
  time,
  isFunction,
  isEasingGenerator,
  isEasingList,
} from "@motionone/utils"
import { AnimationOptions } from "@motionone/types"
import {
  addTransformToElement,
  isTransform,
  transformDefinitions,
} from "./utils/transforms"
import { convertEasing } from "./utils/easing"
import { supports } from "./utils/feature-detection"
import { hydrateKeyframes, keyframesList } from "./utils/keyframes"
import { style } from "./style"
import { getStyleName } from "./utils/get-style-name"
import { isNumber, noop } from "@motionone/utils"
import { stopAnimation } from "./utils/stop-animation"

function getDevToolsRecord() {
  return (window as any).__MOTION_DEV_TOOLS_RECORD
}

export function animateStyle(
  element: Element,
  key: string,
  keyframesDefinition: ValueKeyframesDefinition,
  options: AnimationOptions = {}
): AnimationFactory {
  const record = getDevToolsRecord()
  const isRecording = options.record !== false && record

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
  const valueIsTransform = isTransform(key)
  let canAnimateNatively = supports.waapi()

  /**
   * If this is an individual transform, we need to map its
   * key to a CSS variable and update the element's transform style
   */
  valueIsTransform && addTransformToElement(element as HTMLElement, key)
  const name = getStyleName(key)

  const motionValue = getMotionValue(data.values, name)

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
  stopAnimation(
    motionValue.animation,
    !(isEasingGenerator(easing) && motionValue.generator) &&
      options.record !== false
  )

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

    if (isEasingGenerator(easing)) {
      const custom = easing.createAnimation(
        keyframes,
        readInitialValue as any,
        valueIsTransform,
        name,
        motionValue
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
      if (supports.cssRegisterProperty()) {
        registerCssVariable(name)
      } else {
        canAnimateNatively = false
      }
    }

    /**
     * If we've been passed a custom easing function, and this browser
     * does **not** support linear() easing, and the value is a transform
     * (and thus a pure number) we can still support the custom easing
     * by falling back to the animation polyfill.
     */
    if (
      valueIsTransform &&
      !supports.linearEasing() &&
      (isFunction(easing) || (isEasingList(easing) && easing.some(isFunction)))
    ) {
      canAnimateNatively = false
    }

    /**
     * If we can animate this value with WAAPI, do so.
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
      if (
        keyframes.length === 1 &&
        (!supports.partialKeyframes() || isRecording)
      ) {
        keyframes.unshift(readInitialValue())
      }

      const animationOptions = {
        delay: time.ms(delay as number),
        duration: time.ms(duration),
        endDelay: time.ms(endDelay),
        easing: !isEasingList(easing)
          ? convertEasing(easing, duration)
          : undefined,
        direction,
        iterations: repeat + 1,
        fill: "both" as FillMode,
      }

      animation = element.animate(
        {
          [name]: keyframes,
          offset,
          easing: isEasingList(easing)
            ? easing.map((thisEasing) => convertEasing(thisEasing, duration))
            : undefined,
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
          style.set(element, name, target)

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
       * polyfill for transforms.
       */
    } else if (valueIsTransform) {
      // We use the last keyframe to detect the unit since the first ones might be null.
      const detectedUnit: string | undefined =
        keyframes.length > 0
          ? extractKeyframeUnit(keyframes[keyframes.length - 1])
          : undefined

      /**
       * If any keyframe is a string (because we measured it from the DOM), we need to convert
       * it into a number before passing to the Animation polyfill.
       */
      keyframes = keyframes.map((value) =>
        typeof value === "string" ? parseFloat(value) : value
      )

      /**
       * If we only have a single keyframe, we need to create an initial keyframe by reading
       * the current value from the DOM.
       */
      if (keyframes.length === 1) {
        keyframes.unshift(parseFloat(readInitialValue() as string))
      }

      const render = (latest: number) => {
        let formattedLatest: string | number
        if (detectedUnit !== undefined) {
          formattedLatest = String(latest) + detectedUnit
        } else if (definition) {
          formattedLatest = definition.toDefaultUnit(latest)
        } else {
          formattedLatest = latest
        }
        style.set(element, name, formattedLatest)
      }

      animation = new Animation(render, keyframes as any, {
        ...options,
        duration,
        easing,
      })
    } else {
      const target = keyframes[keyframes.length - 1]
      style.set(
        element,
        name,
        definition && isNumber(target)
          ? definition.toDefaultUnit(target)
          : target
      )
    }

    if (isRecording) {
      record(
        element as HTMLElement,
        key,
        keyframes,
        {
          duration,
          delay: delay as number,
          easing,
          repeat,
          offset,
        },
        "motion-one"
      )
    }

    motionValue.setAnimation(animation)

    return animation
  }
}

function extractKeyframeUnit(keyframe: string | number): string | undefined {
  if (typeof keyframe !== "string") {
    return undefined
  }

  let i: number
  for (i = keyframe.length - 1; i >= 0; i--) {
    const char = keyframe[i]
    switch (char) {
      case "0":
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
      case ".":
      case "-":
      case "+":
        return keyframe.slice(i + 1).trim()
    }
  }
  return keyframe.trim()
}
