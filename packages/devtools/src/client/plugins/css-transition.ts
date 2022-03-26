import { BezierDefinition, Easing } from "@motionone/types"
import { DevToolsPlugin } from "../../types"
import { store } from "../state"

type TransitionDefinition = [string, string, string, string]

type MultiAnimationArray = Array<Animation | CSSTransition>

export const splitTransitions = (transitions: string): string[] =>
  transitions.split(/,\s*(?!\s*\d)/)

export const splitTransitionIntoProps = (
  transition: string
): TransitionDefinition =>
  transition.split(/ (?![^()]*\))/) as TransitionDefinition

function getRecordedAnimationFromTransitionEvent({
  target,
  propertyName,
}: TransitionEvent) {
  if (!target) return

  const element = target as HTMLElement

  const { transition: transitionStyle } = window.getComputedStyle(element)
  const transitions = splitTransitions(transitionStyle)

  const nameAsPipeCase = pipeToCamel(propertyName)

  let valueTransition: TransitionDefinition | undefined

  for (const transitionDefinition of transitions) {
    const props = splitTransitionIntoProps(transitionDefinition)

    if (props[0] === "all") {
      valueTransition = props
    } else if (props[0] === propertyName) {
      valueTransition = props
      break
    }
  }

  if (!valueTransition) return

  const [_, duration, easing, delay] = valueTransition
  const elementAnimations = element.getAnimations() as MultiAnimationArray
  const valueAnimation = elementAnimations.find(
    (animation) =>
      (animation as CSSTransition).transitionProperty === propertyName
  ) as CSSTransition | undefined

  if (!valueAnimation) return

  const keyframes = (valueAnimation.effect as KeyframeEffect)?.getKeyframes?.()

  if (!keyframes) return

  return {
    valueName: nameAsPipeCase,
    keyframes: keyframes.map((keyframe) => keyframe[nameAsPipeCase] as string),
    options: {
      delay: parseFloat(delay),
      duration: parseFloat(duration),
      easing: easing.startsWith("cubic-bezier")
        ? getEasingPoints(easing)
        : (easing as Easing),
    },
  }
}

function record(event: TransitionEvent) {
  const animation = getRecordedAnimationFromTransitionEvent(event)

  if (animation) {
    store
      .getState()
      .recordAnimation(
        event.target as HTMLElement,
        animation.valueName,
        animation.keyframes,
        animation.options,
        "css-transition"
      )
  }
}

export const cssTransition: DevToolsPlugin = {
  id: "css-transition",
  onRecordStart: () => {
    window.addEventListener("transitionrun", record)
  },
  onRecordEnd: () => {
    window.removeEventListener("transitionrun", record)
  },
}

const getEasingPoints = (easing: string): BezierDefinition =>
  easing
    .replace("cubic-bezier(", "")
    .replace(")", "")
    .split(",")
    .map(parseFloat) as BezierDefinition

export const camelToPipe = (str: string) =>
  str.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)

export const pipeToCamel = (str: string) =>
  str.replace(/-([a-z])/g, (g) => g[1].toUpperCase())