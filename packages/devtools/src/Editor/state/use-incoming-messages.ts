import { useEffect } from "react"
import { MotionMessage } from "../../types"
import { EditorState } from "./types"
import { useEditorState } from "./use-editor-state"

const getAddAnimations = (state: EditorState) => state.addAnimations
const getClear = (state: EditorState) => state.clear

export function useIncomingMessages(port?: chrome.runtime.Port) {
  const addAnimations = useEditorState(getAddAnimations)
  const clear = useEditorState(getClear)

  useEffect(() => {
    if (!port) return

    const listener = (message: MotionMessage) => {
      switch (message.type) {
        case "animationstart": {
          return addAnimations(message.animations)
        }
        case "clear": {
          return clear()
        }
      }
    }

    port.onMessage.addListener(listener)

    return () => port.onMessage.removeListener(listener)
  }, [port, addAnimations, clear])
}
