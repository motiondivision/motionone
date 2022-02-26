import * as React from "react"
import { useEffect, useState } from "react"
import { usePort } from "./state/use-port"
import { useIsRecording } from "./state/use-is-recording"
import { AnimationStartMessage, MotionMessage } from "../types"

export function Editor() {
  const port = usePort()
  const [isRecording, setIsRecording] = useIsRecording(port)
  const [animations, setAnimations] = useState<AnimationStartMessage[]>([])

  useEffect(() => {
    if (!port) return

    const listener = (message: MotionMessage) => {
      if (message.type === "animationstart") {
        setAnimations([...animations, message])
      }
    }

    port?.onMessage.addListener(listener)
    return () => port?.onMessage.removeListener(listener)
  }, [port, animations])

  return (
    <>
      <button onClick={() => setIsRecording(!isRecording)}>
        {isRecording ? "Stop" : "Record"}
      </button>
      {animations.map((animation) => (
        <div>{JSON.stringify(animation)}</div>
      ))}
    </>
  )
}
