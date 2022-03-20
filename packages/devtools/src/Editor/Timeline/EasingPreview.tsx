import * as React from "react"
import { getEasingFunction } from "@motionone/animation"
import { Easing } from "@motionone/types"

interface Props {
  segments?: number
  easing: Easing
  style?: React.CSSProperties
}

export function EasingPreview({ easing, segments = 100, style }: Props) {
  const easingFunction = getEasingFunction(easing)
  let d = "M0,100 "

  for (let i = 0; i < segments; i++) {
    d += `L${i + 1},${easingFunction(1 - i / 100) * 100} `
  }

  return (
    <svg viewBox="-10 -10 120 120">
      <path
        d={d}
        style={{
          fill: "none",
          stroke: "var(--white)",
          strokeWidth: 2,
          ...style,
        }}
      />
    </svg>
  )
}
