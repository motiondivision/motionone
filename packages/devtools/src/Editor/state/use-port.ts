import { useEffect, useState } from "react"
import { DevToolsInitMessage } from "../../types"

export function usePort() {
  const [port, setPort] = useState<chrome.runtime.Port | undefined>(undefined)

  useEffect(() => {
    const port = chrome.runtime.connect({ name: "devtools-page" })

    const message: DevToolsInitMessage = {
      type: "init",
      tabId: chrome.devtools.inspectedWindow.tabId,
    }

    port.postMessage(message)

    setPort(port)
  }, [])

  return port
}
