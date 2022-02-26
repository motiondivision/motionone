import * as React from "react"
import { render } from "react-dom"
import { Editor } from "./Editor/index"

const rootNode = document.getElementById("app")

if (rootNode) {
  render(<Editor />, rootNode)
}
