import { Easing, EasingFunction, EasingGenerator } from "@motionone/types"

export const isEasingGenerator = (
  easing: Easing | Easing[] | EasingGenerator | EasingFunction
): easing is EasingGenerator =>
  typeof easing === "object" &&
  Boolean((easing as EasingGenerator).createAnimation)
