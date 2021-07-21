import React, { useState } from "react"
import "./animate.css"
import { animated } from "../src/targets/react"
import { AnimatePresence } from "framer-motion"

export interface BoxProps {}

export const Box: React.FC<BoxProps> = ({}) => {
  const [isVisible, setIsVisible] = useState(true)
  return (
    <AnimatePresence>
      {isVisible && (
        <animated.div
          onClick={() => setIsVisible(false)}
          className="container"
          initial={{ opacity: 0 }}
          style={{ opacity: 1, scale: 1 }}
          hover={{ scale: 1.2 }}
          press={{ scale: 0.9 }}
          exit={{ scale: 0, opacity: 0 }}
        />
      )}
    </AnimatePresence>
  )
}

// export const SpringBox: React.FC<BoxProps> = ({}) => {
//   const state = useRef({
//     initialPoint: [0, 0],
//     velocity: [0, 0],
//     point: [0, 0],
//   })

//   const isDragging = useRef(false)
//   const ref = useRef(null)
//   return (
//     <div
//       style={{
//         width: "100vw",
//         height: "100vh",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//       }}
//     >
//       <div
//         ref={ref}
//         onMouseDown={(e) => {
//           const { initialPoint, point, velocity } = state.current
//           initialPoint[0] = e.pageX
//           initialPoint[1] = e.pageY

//           let prev = [...point]

//           const handleMouseMove = (e) => {
//             isDragging.current = true
//             prev = [...point]
//             point[0] = e.pageX - initialPoint[0]
//             point[1] = e.pageY - initialPoint[1]
//             velocity[0] = velocityPerSecond(
//               velocityPerFrame(point[0] - prev[0], 16),
//               16
//             )
//             velocity[1] = velocityPerSecond(
//               velocityPerFrame(point[1] - prev[1], 16),
//               16
//             )

//             if (ref.current) {
//               ref.current.style.transform = `translate(${point[0]}px, ${point[1]}px)`
//             }
//           }

//           const handleMouseUp = (e) => {
//             isDragging.current = false
//             document.removeEventListener("mousemove", handleMouseMove)
//             document.removeEventListener("mouseup", handleMouseUp)
//             console.log(velocity[0])
//             animateSpring(ref.current, "x", 0, {
//               velocity: velocity[0] * 100,
//               from: point[0],
//             })
//             animateSpring(ref.current, "y", 0, {
//               velocity: velocity[1] * 100,
//               from: point[1],
//             })
//           }

//           document.addEventListener("mousemove", handleMouseMove)

//           document.addEventListener("mouseup", handleMouseUp)
//         }}
//         // options={{ duration: 0.3 }}
//         // initial={{
//         //   // backgroundColor: "red",
//         //   x: "0px",
//         // }}
//         // style={{
//         //   // backgroundColor: color ? "red" : "blue",
//         //   x: color ? "500px" : "100px",
//         // }}
//         // onClick={() => setColor(!color)}
//         // // hover={{ transform: "scale(2)" }}
//         // // press={{ transform: "scale(0.7)" }}
//         className="container"
//       />
//     </div>
//   )

//   // const ref = useRef(null)

//   // useEffect(() => {
//   //   const element = ref.current
//   //   if (!element) return

//   //   animate(
//   //     element,
//   //     { backgroundColor: "blue", transform: "translateX(100px)" },
//   //     { repeat: 6, delay: 1 }
//   //   )
//   // }, [])

//   // return <div ref={ref} className="container" />
// }
