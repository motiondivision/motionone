import { useEffect, useRef } from "react"
import { AnimationMetadata, MotionMessage } from "../../types"
import { getSelectedAnimation, getSelectedAnimationName } from "./selectors"
import { useEditorState } from "./use-editor-state"

export function useEditAnimation(port?: chrome.runtime.Port) {
  const selectedAnimationName = useEditorState(getSelectedAnimationName)
  const selectedAnimation = useEditorState(getSelectedAnimation)

  const time = selectedAnimation?.currentTime

  const prevSelectedAnimation = useRef<AnimationMetadata | undefined>()
  useEffect(() => {
    if (!port) return

    let message: MotionMessage | undefined

    if (
      selectedAnimationName &&
      selectedAnimation &&
      prevSelectedAnimation.current !== selectedAnimation
    ) {
      message = {
        type: "inspectanimation",
        animation: selectedAnimation,
        tabId: chrome.devtools.inspectedWindow.tabId,
      }
    } else if (time !== undefined && prevSelectedAnimation.current) {
      // TODO: This probably isn't firing - do we need a scrub event?
      message = {
        type: "scrubanimation",
        time,
        tabId: chrome.devtools.inspectedWindow.tabId,
      }
    }

    message && port.postMessage(message)

    prevSelectedAnimation.current = selectedAnimation
  }, [port, selectedAnimationName, selectedAnimation?.elements, time])
}
