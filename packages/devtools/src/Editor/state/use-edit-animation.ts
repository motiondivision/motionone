import { useEffect } from "react"
import { InspectAnimationMessage, ScrubAnimationMessage } from "../../types"
import { getSelectedAnimation, getSelectedAnimationName } from "./selectors"
import { useEditorState } from "./use-editor-state"

export function useEditAnimation(port?: chrome.runtime.Port) {
  const selectedAnimationName = useEditorState(getSelectedAnimationName)
  const selectedAnimation = useEditorState(getSelectedAnimation)

  const time = selectedAnimation?.currentTime

  useEffect(() => {
    if (!port || !selectedAnimationName || !selectedAnimation) return

    const message: InspectAnimationMessage = {
      type: "inspectanimation",
      animation: selectedAnimation,
      tabId: chrome.devtools.inspectedWindow.tabId,
    }

    port.postMessage(message)
  }, [port, selectedAnimationName, selectedAnimation?.elements])

  useEffect(() => {
    if (time === undefined) return

    const message: ScrubAnimationMessage = {
      type: "scrubanimation",
      time,
      tabId: chrome.devtools.inspectedWindow.tabId,
    }

    port?.postMessage(message)
  }, [port, time])
}
