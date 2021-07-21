const featureTests = {
  cssRegisterProperty: () =>
    typeof CSS !== "undefined" &&
    Object.hasOwnProperty.call(CSS, "registerProperty"),
  waapi: () => Object.hasOwnProperty.call(Element.prototype, "animate"),
}

const results = {}

interface FeatureTests {
  cssRegisterProperty: () => boolean
  waapi: () => boolean
}

export const supports = Object.keys(featureTests).reduce((acc, key) => {
  acc[key] = () => {
    if (results[key] === undefined) results[key] = featureTests[key]()
    return results[key]
  }
  return acc
}, {}) as FeatureTests
