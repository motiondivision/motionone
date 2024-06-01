const testAnimation = (
  keyframes: PropertyIndexedKeyframes,
  options?: KeyframeAnimationOptions
) => document.createElement("div").animate(keyframes, options)

const featureTests = {
  cssRegisterProperty: () =>
    typeof CSS !== "undefined" &&
    Object.hasOwnProperty.call(CSS, "registerProperty"),
  waapi: () => Object.hasOwnProperty.call(Element.prototype, "animate"),
  partialKeyframes: () => {
    try {
      testAnimation({ opacity: [1] })
    } catch (e) {
      return false
    }
    return true
  },
  finished: () =>
    Boolean(testAnimation({ opacity: [0, 1] }, { duration: 0.001 }).finished),
  linearEasing: () => {
    try {
      testAnimation({ opacity: 0 }, { easing: "linear(0, 1)" })
    } catch (e) {
      return false
    }
    return true
  },
}

const results = {}

type FeatureTests = Record<keyof typeof featureTests, () => boolean>

export const supports = {} as FeatureTests
for (const key in featureTests) {
  supports[key as keyof typeof supports] = () => {
    if (results[key as keyof typeof results] === undefined)
      (results[key as keyof typeof results] as any) =
        featureTests[key as keyof typeof featureTests]()
    return results[key as keyof typeof results]
  }
}
