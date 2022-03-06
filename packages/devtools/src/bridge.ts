import { IsRecordingMessage, MotionMessage } from "./types"
;(() => {
  const script = document.createElement("script")
  script.src = chrome.runtime.getURL("js/client.js")
  document.documentElement.appendChild(script)
  script.parentNode?.removeChild(script)

  let recordingTabsAtLoad: { [key: number]: boolean } | undefined = {}
  chrome.storage.sync.get("recordingTabs", ({ recordingTabs }) => {
    recordingTabsAtLoad = recordingTabs
  })

  let backgroundPort: chrome.runtime.Port | undefined

  function connect() {
    backgroundPort = chrome.runtime.connect({ name: "client" })

    backgroundPort.onDisconnect.addListener(() => {
      backgroundPort = undefined
    })
  }

  connect()

  backgroundPort?.onMessage.addListener((backgroundMessage) => {
    switch (backgroundMessage.type) {
      case "tabId": {
        const { tabId } = backgroundMessage
        console.log("got tab id", tabId, recordingTabsAtLoad)
        if (!recordingTabsAtLoad || !recordingTabsAtLoad[tabId]) return

        const message: IsRecordingMessage = {
          type: "isrecording",
          isRecording: true,
          tabId,
        }
        console.log("posting message")
        window.postMessage(message, "*")
      }
    }
  })

  window.addEventListener("message", ({ data }) => {
    if (data.type === "clientready") {
      backgroundPort?.postMessage({ type: "requestTabId" })
    }
  })

  // const tabId = 0
  // console.log(recordingTabs)
  // if (!recordingTabs[tabId]) return

  // const message: IsRecordingMessage = {
  //   type: "isrecording",
  //   isRecording: true,
  //   tabId,
  // }
  // window.postMessage(message, "*")

  // backgroundPort.onMessage.addListener(() => {
  //   /**
  //    * Receive message from backgroundPort - replace runtime.listener with this
  //    */
  // })

  chrome.runtime.onMessage.addListener((message: MotionMessage) => {
    window.postMessage(message, "*")
  })

  const handleMessages = (event: MessageEvent<MotionMessage>) => {
    if (event.source != window) return

    if (!backgroundPort) connect()

    switch (event.data.type) {
      /**
       * Events from client to backend
       */
      case "animationstart":
      case "login": {
        backgroundPort!.postMessage(event.data)
        return
      }
    }
  }

  window.addEventListener("message", handleMessages, false)
})()
