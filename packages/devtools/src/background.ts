import { MotionMessage, ClearAnimationsMessage } from "./types"

const devToolsConnections = new Map<number, chrome.runtime.Port>()
const clientConnections = new Map<number, chrome.runtime.Port>()

chrome.runtime.onConnect.addListener((port) => {
  switch (port.name) {
    case "client": {
      const listener = (message: MotionMessage, { sender }: any) => {
        console.log("received message from client")
        if (message.type === "clientready") {
          port.postMessage({ type: "tabId", tabId: sender.tab.id })

          clientConnections.set(sender.tab.id, port)
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
        console.log("received message from dev tools")
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

            clientConnections.get(message.tabId)?.postMessage(message)
            return
          }
          case "inspectanimation":
          case "scrubanimation": {
            clientConnections.get(message.tabId)?.postMessage(message)
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

chrome.webNavigation.onCompleted.addListener(
  (event) => {
    const devToolsPort = devToolsConnections.get(event.tabId)

    if (devToolsPort) {
      const message: ClearAnimationsMessage = { type: "clear" }
      devToolsPort.postMessage(message)
    }

    loadClient(event.tabId)
  },
  { url: [{ urlPrefix: "http" }, { urlPrefix: "localhost" }] }
)

chrome.runtime.onMessage.addListener((request, sender) => {
  if (!sender.tab) return

  const { id } = sender.tab

  if (typeof id !== "number") return

  const connection = devToolsConnections.get(id)
  connection?.postMessage(request)
})

/**
 * Handle authentication
 */
chrome.runtime.onMessageExternal.addListener(
  (request: MotionMessage, sender, sendResponse) => {
    // Only accept messages from motion.dev
    if (!sender.url || !sender.url.includes("motion.dev")) return

    switch (request.type) {
      case "login": {
        const { username, isPro } = request

        console.log("setting storage user to", { username, isPro })

        chrome.storage.sync.set({ user: { username, isPro } }, () => {
          sendResponse({ success: true })
        })
        break
      }
    }
  }
)

function loadClient(tabId: number) {
  chrome.scripting.executeScript({
    target: { tabId },
    func: () => {
      chrome.runtime.onMessage.addListener((message, _, sendResponse) => {
        if (message === "requestHasLoaded") {
          sendResponse(Boolean((window as any).__MOTION_BRIDGE_HAS_LOADED))
        }
      })
    },
  })

  chrome.tabs.sendMessage(
    tabId,
    "requestHasLoaded",
    { frameId: 0 },
    (response) => {
      if (response) return

      chrome.scripting.executeScript({
        target: { tabId, allFrames: true },
        files: ["js/bridge.js"],
      } as any)
    }
  )
}
