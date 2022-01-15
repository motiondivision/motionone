import {
  mountedStates,
  getOptions,
  defaults,
  isCustomEasing,
  Options,
} from "@motionone/dom"

const createPresenceHandler = (isVisible: boolean) => (element: Element) => {
  const state = mountedStates.get(element)

  if (!state) return { duration: 0 }

  state.setActive("exit", !isVisible)

  return {
    duration: isVisible ? 0 : calcDuration(state.getOptions()),
  }
}

export const presence = {
  in: createPresenceHandler(true),
  out: createPresenceHandler(false),
}

// TODO: Get duration from spring
function calcDuration({ transition = {}, exit }: Options) {
  let maxDuration = 0

  if (!exit || typeof exit === "string") return maxDuration

  for (const key in exit) {
    const valueTransition = getOptions(transition, key)
    let { delay = 0, duration = defaults.duration, easing } = valueTransition

    if (isCustomEasing(easing)) {
      const customAnimation = easing.createAnimation([0, 100], () => "0", true)

      if (customAnimation.duration !== undefined) {
        duration = customAnimation.duration
      }
    }

    maxDuration = Math.max(maxDuration, delay + duration)
  }

  return maxDuration * 1000
}
