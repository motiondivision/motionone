import { MotionMessage } from "./types"

const devToolsConnections = new Map<number, chrome.runtime.Port>()

chrome.runtime.onConnect.addListener((port) => {
  console.log("connected", port.name)

  switch (port.name) {
    case "client": {
      const listener = (message: MotionMessage, { sender }: any) => {
        const port = devToolsConnections.get(sender.tab.id)

        // TODO: Sender doesnt contain tab id
        if (port) port.postMessage(message)
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

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (changeInfo.status == "complete" && tab.url && /^http/.test(tab.url)) {
    loadClient(tabId)
  }
})

chrome.runtime.onMessage.addListener(function (request, sender) {
  if (!sender.tab) return

  const { id } = sender.tab

  if (typeof id !== "number") return

  const connection = devToolsConnections.get(id)

  if (connection) {
    console.log("sending from page to dev tools", request)
    connection.postMessage(request)
  }
})

function loadClient(tabId: number) {
  chrome.scripting.executeScript({
    target: { tabId },
    files: ["js/bridge.js"],
  } as any)
}
