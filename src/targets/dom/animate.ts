import {
  AnimationControls,
  AnimationOptionsWithOverrides,
  AnimationWithCommitStyles,
  MotionKeyframesDefinition,
} from "./types"
import { stopAnimation } from "./utils/stop-animation"
import { animateStyle } from "./animate-style"
import { getOptions } from "./utils/options"

type AcceptedElements = Element | Element[] | NodeListOf<Element> | string

interface AnimationState {
  animations: AnimationWithCommitStyles[]
  finished: Promise<any>
}

export function animate(
  elements: AcceptedElements,
  keyframes: MotionKeyframesDefinition,
  {
    stagger = 0,
    ...options
  }: AnimationOptionsWithOverrides & { stagger?: number } = {}
): AnimationControls {
  elements = resolveElements(elements)

  const animations: AnimationWithCommitStyles[] = []
  for (let i = 0; i < elements.length; i++) {
    const element = elements[i]

    for (const key in keyframes) {
      const valueOptions = getOptions(options, key)
      if (stagger) {
        valueOptions.delay ||= 0
        valueOptions.delay += stagger * i
      }

      const animation = animateStyle(
        element,
        key,
        keyframes[key]!,
        valueOptions
      )

      animation && animations.push(animation as any)
    }
  }

  const state = {
    animations,
    finished: Promise.all(animations.map((animation) => animation.finished)),
  } as any
  return new Proxy(state, controls) as AnimationControls
}

function resolveElements(elements: AcceptedElements): Element[] {
  if (typeof elements === "string") {
    elements = document.querySelectorAll(elements)
  } else if (elements instanceof Element) {
    elements = [elements]
  }

  return Array.from(elements)
}

const controls = {
  get: (target: AnimationState, key: string) => {
    switch (key) {
      case "finished":
        return target.finished
      case "currentTime":
        // TODO Find first active animation
        const duration = target.animations[0]?.[key] || 0
        return duration ? duration / 1000 : 0
      case "playbackRate":
        // TODO Find first active animation
        return target.animations[0]?.[key]
      case "stop":
        return () => target.animations.forEach(stopAnimation)
      default:
        return () => target.animations.forEach((animation) => animation[key]())
    }
  },
  set: (target: AnimationState, key: string, value: number) => {
    switch (key) {
      case "currentTime":
        value = value * 1000
      case "currentTime":
      case "playbackRate":
        for (let i = 0; i < target.animations.length; i++) {
          target.animations[i][key] = value
        }
        return true
    }
    return false
  },
}
