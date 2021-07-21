export const supports = {
  cssRegisterProperty:
    typeof CSS !== "undefined" &&
    Object.hasOwnProperty.call(CSS, "registerProperty"),
  partialKeyframes: true,
}

// TODO Detect keyframes by running an animation with one keyframe, if it throws set partialKeyframes to true
