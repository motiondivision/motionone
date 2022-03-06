import { MotionMessage, ClearAnimationsMessage } from "./types"

const devToolsConnections = new Map<number, chrome.runtime.Port>()

chrome.runtime.onConnect.addListener((port) => {
  switch (port.name) {
    case "client": {
      const listener = (message: MotionMessage, { sender }: any) => {
        if (message.type === "requestTabId") {
          port.postMessage({ type: "tabId", tabId: sender.tab.id })
        } else {
          const devToolsPort = devToolsConnections.get(sender.tab.id)
          if (devToolsPort) devToolsPort.postMessage(message)
        }
      }

      port.onMessage.addListener(listener)

      return
    }
    case "devtools-page": {
      const listener = (message: MotionMessage) => {
        switch (message.type) {
          case "init": {
            devToolsConnections.set(message.tabId, port)
            return
          }
          case "isrecording": {
            chrome.storage.sync.get(
              "recordingTabs",
              ({ recordingTabs = {} }) => {
                if (message.isRecording) {
                  recordingTabs[message.tabId] = true
                } else {
                  delete recordingTabs[message.tabId]
                }

                chrome.storage.sync.set({ recordingTabs })
              }
            )

            chrome.tabs.sendMessage(message.tabId, message)
            return
          }
        }
      }

      port.onMessage.addListener(listener)

      port.onDisconnect.addListener(() => {
        port.onMessage.removeListener(listener)
        devToolsConnections.forEach((connection, id) => {
          connection === port && devToolsConnections.delete(id)
        })
      })
    }
  }
})

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status == "complete" && tab.url && /^http/.test(tab.url)) {
    const devToolsPort = devToolsConnections.get(tabId)

    if (devToolsPort) {
      const message: ClearAnimationsMessage = { type: "clear" }
      devToolsPort.postMessage(message)
    }

    loadClient(tabId)
  }
})

chrome.runtime.onMessage.addListener((request, sender) => {
  if (!sender.tab) return

  const { id } = sender.tab

  if (typeof id !== "number") return

  const connection = devToolsConnections.get(id)
  connection?.postMessage(request)
})

chrome.runtime.onMessageExternal.addListener(
  (request, sender, _sendResponse) => {
    if (sender.url && sender.url.includes("motion.dev")) {
      console.log(request)
    }
  }
)

function loadClient(tabId: number) {
  chrome.scripting.executeScript({
    target: { tabId, allFrames: true },
    files: ["js/bridge.js"],
  } as any)
}
