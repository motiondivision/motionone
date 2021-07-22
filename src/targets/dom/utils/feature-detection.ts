const featureTests = {
  cssRegisterProperty: () =>
    typeof CSS !== "undefined" &&
    Object.hasOwnProperty.call(CSS, "registerProperty"),
  waapi: () => Object.hasOwnProperty.call(Element.prototype, "animate"),
  partialKeyframes: () => {
    try {
      document
        .createElement("div")
        .animate({ opacity: [1] }, { duration: 0.001 })
    } catch (e) {
      return false
    }
    return true
  },
}

const results = {}

interface FeatureTests {
  cssRegisterProperty: () => boolean
  waapi: () => boolean
  partialKeyframes: () => boolean
}

export const supports = Object.keys(featureTests).reduce((acc, key) => {
  acc[key] = () => {
    if (results[key] === undefined) results[key] = featureTests[key]()
    return results[key]
  }
  return acc
}, {}) as FeatureTests
