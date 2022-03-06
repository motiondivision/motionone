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
      switch (message.type) {
        case "animationstart": {
          return dispatch({ type: Actions.Add, animations: message.animations })
        }
        case "clear": {
          return dispatch({ type: Actions.Clear })
        }
      }
    }

    port.onMessage.addListener(listener)

    return () => port.onMessage.removeListener(listener)
  }, [port, dispatch])
}
