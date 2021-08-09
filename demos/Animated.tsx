import React from "react"
import "./animated.css"
import { animated } from "../src/targets/react"

export interface InViewportProps {}

export const InViewport: React.FC<InViewportProps> = ({}) => {
  return (
    <div style={{ paddingTop: 1000, paddingBottom: 1000 }}>
      <animated.div
        style={{ width: 100, height: 100, background: "red", borderRadius: 10 }}
        inViewport={{ scale: 2 }}
        onViewportEnter={() => console.log("entered")}
        onViewportLeave={() => console.log("left")}
      />
    </div>
  )
}
