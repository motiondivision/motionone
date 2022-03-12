import { useEffect, useState } from "react"
import { DevToolsInitMessage } from "../../types"
import { useEditAnimation } from "./use-edit-animation"
import { useIncomingMessages } from "./use-incoming-messages"
import { useIsRecording } from "./use-is-recording"

export function usePort() {
  const [port, setPort] = useState<chrome.runtime.Port | undefined>(undefined)

  useEffect(() => {
    if (!port) {
      const port = chrome.runtime.connect({ name: "devtools-page" })

      const message: DevToolsInitMessage = {
        type: "init",
        tabId: chrome.devtools.inspectedWindow.tabId,
      }

      port.postMessage(message)

      port.onDisconnect.addListener(() => setPort(undefined))

      setPort(port)
    }
  }, [port])

  useIncomingMessages(port)
  useIsRecording(port)
  useEditAnimation(port)

  return port
}
