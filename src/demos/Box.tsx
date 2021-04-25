import React, { useRef } from "react"
import { useEffect } from "react"
import "./box.css"
import { animate } from "../dom/animate"

export interface BoxProps {}

export const Box: React.FC<BoxProps> = ({}) => {
  const ref = useRef(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    animate(
      element,
      { backgroundColor: "blue", transform: "translateX(100px)" },
      { repeat: 6, delay: 1 }
    )
  }, [])

  return <div ref={ref} className="container" />
}
