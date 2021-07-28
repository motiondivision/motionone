const testAnimation = (keyframes: PropertyIndexedKeyframes) =>
  document.createElement("div").animate(keyframes, { duration: 0.001 })

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
  finished: () => Boolean(testAnimation({ opacity: [0, 1] }).finished),
}

const results = {}

interface FeatureTests {
  cssRegisterProperty: () => boolean
  waapi: () => boolean
  partialKeyframes: () => boolean
  finished: () => boolean
}

export const supports = Object.keys(featureTests).reduce((acc, key) => {
  acc[key] = () => {
    if (results[key] === undefined) results[key] = featureTests[key]()
    return results[key]
  }
  return acc
}, {}) as FeatureTests
