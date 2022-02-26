const devToolsConnections = new Map<number, chrome.runtime.Port>()

chrome.runtime.onConnect.addListener((port) => {
  console.log("connected", port.name)

  switch (port.name) {
    case "client": {
      const listener = (message: any, { sender }: any) => {
        const port = devToolsConnections.get(sender.tab.id)

        // TODO: Sender doesnt contain tab id
        if (port) port.postMessage(message)
      }

      port.onMessage.addListener(listener)
      return
    }
    case "devtools-page": {
      const listener = (message: any, { sender }: any) => {
        if (message.name === "init" && message.tabId) {
          devToolsConnections.set(message.tabId, port)
          return
        } else if (message.name === "recording") {
          console.log("Is recording", message.isRecording)
          console.log(sender)
          chrome.tabs.sendMessage(message.tabId, message)

          // Send message to client with new recording status
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
