import { useEffect, useState } from "react"

export function useIsRecording(port?: chrome.runtime.Port) {
  const recordingState = useState(false)
  const [isRecording] = recordingState

  useEffect(() => {
    port?.postMessage({
      name: "recording",
      isRecording,
      tabId: chrome.devtools.inspectedWindow.tabId,
    })
  }, [isRecording])

  return recordingState
}
