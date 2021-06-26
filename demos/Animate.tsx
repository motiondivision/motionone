import React from "react"
import "./animate.css"
import { animated } from "../src"

export interface BoxProps {}

export const Box: React.FC<BoxProps> = ({}) => {
  const [color, setColor] = React.useState(false)
  return (
    <animated.div
      options={{ duration: 0.3 }}
      // first={{ backgroundColor: "red", transform: "none" }}
      style={{
        backgroundColor: color ? "red" : "blue",
        transform: "none",
      }}
      onClick={() => setColor(!color)}
      hover={{ transform: "scale(2)" }}
      press={{ transform: "scale(0.7)" }}
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
