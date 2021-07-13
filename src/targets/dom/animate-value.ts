import { getAnimationData } from "./data"
import { AnimationOptions, AnimationWithCommitStyles } from "./types"
import {
  browserSupportsCssRegisterProperty,
  isCssVar,
  registerCssVariable,
} from "./utils/css-var"
import { noop } from "./utils/noop"
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

/**
 * TODO:
 * - Support offsets
 * - Detect WAAPI support and set default canAnimateNatively
 * - Automatic interrupt by cancelling existing animation
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
  let canAnimateNatively = true

  keyframes = Array.isArray(keyframes) ? keyframes : [keyframes]

  let finalFrame = noop

  if (isTransform(name)) {
    if (transformAlias[name]) name = transformAlias[name]
    addTransformToElement(element as HTMLElement, name)
    name = asTransformCssVar(name)

    // Convert numbers to default value types
    const definition = transformPropertyDefinitions.get(name)
    if (definition?.toDefaultUnit) {
      keyframes = keyframes.map((value) =>
        typeof value === "number" ? definition.toDefaultUnit!(value) : value
      )
    }
  }

  const target = keyframes[keyframes.length - 1]

  if (isCssVar(name)) {
    finalFrame = () =>
      (element as HTMLElement).style.setProperty(name, target as string)

    if (!browserSupportsCssRegisterProperty) {
      canAnimateNatively = false
    } else {
      registerCssVariable(name)
    }
  } else {
    finalFrame = () => ((element as HTMLElement).style[name] = target)
  }

  const data = getAnimationData(element)
  if (data.activeAnimations[name]) {
    stop(data.activeAnimations[name]!)
    data.activeAnimations[name] = undefined
  }

  if (canAnimateNatively) {
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
