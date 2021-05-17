import React, { useRef } from "react"
import { useEffect } from "react"
import "./timeline.css"
import { timeline } from "../src"

export interface BoxProps {}

export const Box: React.FC<BoxProps> = ({}) => {
  const ref = useRef(null)

  useEffect(() => {
    timeline([".box", { opacity: 1 }, { duration: 1 }], "+10", [
      0.6,
      [".a", { transform: "translateX(100px)" }, { duration: 1 }],
      [".b", { transform: "translateX(100px)" }, { duration: 1 }],
    ])
  }, [])

  return (
    <div id="container">
      <div className="box" />
      <div className="box" />
      <div className="box" />
      <div className="a" />
      <div className="b" />
    </div>
  )
}
