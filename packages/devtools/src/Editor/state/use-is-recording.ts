import { useEffect } from "react"
import { IsRecordingMessage } from "../../types"
import { EditorState } from "./types"
import { useEditorState } from "./use-editor-state"

const getIsRecording = (state: EditorState) => state.isRecording

export function useIsRecording(port?: chrome.runtime.Port) {
  const isRecording = useEditorState(getIsRecording)

  useEffect(() => {
    const message: IsRecordingMessage = {
      type: "isrecording",
      isRecording: isRecording,
      tabId: chrome.devtools.inspectedWindow.tabId,
    }
    console.log("sending message to ", port)
    port?.postMessage(message)
  }, [port, isRecording])
}
