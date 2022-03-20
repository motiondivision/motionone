import * as React from "react"
import { render } from "react-dom"
import { Editor } from "./Editor/index"

chrome.storage.sync.get("user", ({ user }) => {
  const rootNode = document.getElementById("app")

  if (!rootNode) return

  render(<Editor user={user} />, rootNode)

  chrome.storage.onChanged.addListener((changes) => {
    for (let [key, { newValue }] of Object.entries(changes)) {
      if (key === "user") {
        render(<Editor user={newValue} />, rootNode)
      }
    }
  })
})
