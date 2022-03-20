import { IsRecordingMessage, MotionMessage } from "./types"

/**
 * This is used to prevent double-loading bridge and client scripts
 */
;(window as any).__MOTION_BRIDGE_HAS_LOADED = true

/**
 * Inject client script into the actual webpage
 */
const script = document.createElement("script")
script.src = chrome.runtime.getURL("js/client.js")
document.documentElement.appendChild(script)
script.parentNode?.removeChild(script)

/**
 * Locally store tabs already recording at page load - this
 * will be used to record animations occuring on page load
 */
let recordingTabsAtLoad: { [key: number]: boolean } | undefined = {}
chrome.storage.sync.get("recordingTabs", ({ recordingTabs }) => {
  recordingTabsAtLoad = recordingTabs
})

/**
 * Connect and track port to the background script
 */
let backgroundPort: chrome.runtime.Port | undefined

function connect() {
  backgroundPort = chrome.runtime.connect({ name: "client" })

  /**
   * Messages background script => web page
   */
  backgroundPort.onMessage.addListener((backgroundMessage: MotionMessage) => {
    switch (backgroundMessage.type) {
      case "tabId": {
        const { tabId } = backgroundMessage

        if (!recordingTabsAtLoad || !recordingTabsAtLoad[tabId]) return

        const message: IsRecordingMessage = {
          type: "isrecording",
          isRecording: true,
          tabId,
        }

        window.postMessage(message, "*")
        return
      }
      case "isrecording":
      case "inspectanimation":
      case "scrubanimation": {
        window.postMessage(backgroundMessage, "*")
        return
      }
    }
  })

  backgroundPort.onDisconnect.addListener(() => {
    backgroundPort = undefined
  })
}

connect()

/**
 * Messages web page => background script
 */
const handleMessages = (event: MessageEvent<MotionMessage>) => {
  if (event.source != window) return

  if (!backgroundPort) connect()

  switch (event.data.type) {
    /**
     * Events from client to backend
     */
    case "animationstart":
    case "clientready":
    case "login": {
      backgroundPort!.postMessage(event.data)
      return
    }
  }
}

window.addEventListener("message", handleMessages, false)
