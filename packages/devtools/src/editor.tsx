import * as React from "react"
import { render } from "react-dom"
import { Editor } from "./Editor/index"

chrome.storage.sync.get("auth", ({ auth }) => {
  const rootNode = document.getElementById("app")
  rootNode && render(<Editor auth={auth} />, rootNode)
})
