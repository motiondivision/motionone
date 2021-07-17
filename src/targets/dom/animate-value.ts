import { getAnimationData } from "./data"
import { AnimationOptions, AnimationWithCommitStyles } from "./types"
import {
  browserSupportsCssRegisterProperty,
  isCssVar,
  registerCssVariable,
} from "./utils/css-var"
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
// import { spring } from "../../generators/spring"
// import { fastInterpolate } from "../../utils/interpolate"

/**
 * The resolution of pregenerated keyframes in milliseconds
 */
// const pregenerationResolution = 10

/**
 * The max number of pregenerated keyframes. With pregenerationResolution this
 * gives us a maximum duration of two seconds.
 *
 * It could be possible to remove this limit if we polyfill some repeat
 * logic and generate a new set of keyframes each iteration.
 *
 * Alternatively, because individual keyframes (being CSS variables) run
 * on the main thread, it could also be possible simple to run these
 * animations synchronously.
 */
// const maxPregeneratedKeyframes = 200

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
  }: // stiffness,
  // damping,
  // mass,
  // velocity,
  // restSpeed = 2,
  // restDelta = 0.1,
  AnimationOptions = {}
) {
  let canAnimateNatively = true

  keyframes = Array.isArray(keyframes) ? keyframes : [keyframes]

  let finalFrame = noop

  if (isTransform(name)) {
    if (transformAlias[name]) name = transformAlias[name]
    addTransformToElement(element as HTMLElement, name)
    name = asTransformCssVar(name)
  }

  const data = getAnimationData(element)
  if (data.activeAnimations[name]) {
    stop(data.activeAnimations[name]!)
    data.activeAnimations[name] = undefined
  }

  /**
   * Pregenerate keyframes if this is a spring
   * TODO: Move to another function
   */
  // if (Boolean(stiffness ?? damping ?? mass) && keyframes.length <= 2) {
  //   // TODO get current value instead of 0
  //   let from = keyframes.length === 1 ? 0 : keyframes[0]
  //   let to = keyframes[1] ?? keyframes[0]

  //   const needsInterpolation =
  //     typeof from === "string" || typeof to === "string"

  //   let numberToValueType = noopReturn

  //   if (needsInterpolation) {
  //     numberToValueType = fastInterpolate([0, 100], [from, to]) as any
  //     from = 0
  //     to = 100
  //   }

  //   from = from as number
  //   to = to as number

  //   if (velocity === undefined) {
  //     // TODO generate initial velocity from existing animation
  //   }

  //   const generator = spring({ stiffness, damping, mass, velocity, from, to })
  //   let isComplete = false
  //   const pregeneratedKeyframes = []
  //   let numPregeneratedKeyframes = 0
  //   let t = 0
  //   let prev = from

  //   while (!isComplete) {
  //     numPregeneratedKeyframes++

  //     const next = generator(t)
  //     pregeneratedKeyframes.push(numberToValueType(next))

  //     const currentVelocity =
  //       t !== 0 ? (next - prev) * (1000 / pregenerationResolution) : 0
  //     const isBelowVelocityThreshold = Math.abs(currentVelocity) <= restSpeed
  //     const isBelowDisplacementThreshold = Math.abs(to - next) <= restDelta
  //     isComplete = isBelowVelocityThreshold && isBelowDisplacementThreshold

  //     t += pregenerationResolution

  //     if (numPregeneratedKeyframes > maxPregeneratedKeyframes) {
  //       // TODO Warn in development mode
  //       isComplete = true
  //     }

  //     prev = next
  //   }

  //   easing = "linear"
  //   keyframes = pregeneratedKeyframes
  //   duration = t / 1000
  // }

  /**
   * Convert numbers to default value types. Currently this only supports
   * transforms but it could also support other value types.
   */
  const definition = transformPropertyDefinitions.get(name)
  if (definition?.toDefaultUnit) {
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

    if (!browserSupportsCssRegisterProperty) {
      canAnimateNatively = false
    } else {
      registerCssVariable(name)
    }
  } else {
    finalFrame = () => ((element as HTMLElement).style[name] = target)
  }

  /**
   * If we can animate this value with WAAPI, do so. Currently this only
   * feature detects CSS.registerProperty but could check WAAPI too.
   */
  if (canAnimateNatively) {
    const values = { [name]: keyframes }
    if (isEasingList(easing)) values.easing = convertEasingList(easing)
    if (offset) values.offset = offset
    console.log(values)
    const animation = element.animate(
      {
        [name]: keyframes,
        offset,
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
