import { useEffect, useState } from "react"

export function usePort() {
  const [port, setPort] = useState<chrome.runtime.Port | undefined>(undefined)

  useEffect(() => {
    const port = chrome.runtime.connect({ name: "devtools-page" })

    port.postMessage({
      name: "init",
      tabId: chrome.devtools.inspectedWindow.tabId,
    })

    setPort(port)
  }, [])

  return port
}
