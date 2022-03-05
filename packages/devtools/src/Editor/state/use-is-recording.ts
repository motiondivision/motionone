import { useEffect } from "react"
import { IsRecordingMessage } from "../../types"
import { EditorState } from "./types"

export function useIsRecording(state: EditorState, port?: chrome.runtime.Port) {
  useEffect(() => {
    const message: IsRecordingMessage = {
      type: "isrecording",
      isRecording: state.isRecording,
      tabId: chrome.devtools.inspectedWindow.tabId,
    }

    port?.postMessage(message)
  }, [port, state.isRecording])
}
