import { Dispatch, useEffect } from "react"
import { MotionMessage } from "../../types"
import { Actions, EditorAction } from "./types"

export function useIncomingMessages(
  dispatch: Dispatch<EditorAction>,
  port?: chrome.runtime.Port
) {
  useEffect(() => {
    if (!port) return

    const listener = (message: MotionMessage) => {
      if (message.type === "animationstart") {
        dispatch({ type: Actions.Add, animations: message.animations })
      }
    }

    port.onMessage.addListener(listener)

    return () => port.onMessage.removeListener(listener)
  }, [port, dispatch])
}
