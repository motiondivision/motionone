import { useState } from "react"

export function useGestureState(
  target: React.CSSProperties,
  stylesToApply?: React.CSSProperties
) {
  const [isGestureActive, setGestureState] = useState(false)
  if (isGestureActive) Object.assign(target, stylesToApply)
  return setGestureState
}
