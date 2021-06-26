import React, { useRef } from "react"
import { useEffect } from "react"
import "./animate.css"
import { animated } from "../src"

export interface BoxProps {}

export const Box: React.FC<BoxProps> = ({}) => {
  return (
    <animated.div
      options={{ repeat: 6, delay: 1 }}
      first={{ backgroundColor: "red", transform: "none" }}
      style={{ backgroundColor: "blue", transform: "translateX(100px)" }}
      className="container"
    />
  )

  // const ref = useRef(null)

  // useEffect(() => {
  //   const element = ref.current
  //   if (!element) return

  //   animate(
  //     element,
  //     { backgroundColor: "blue", transform: "translateX(100px)" },
  //     { repeat: 6, delay: 1 }
  //   )
  // }, [])

  // return <div ref={ref} className="container" />
}
