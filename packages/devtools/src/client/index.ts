import { handleMessages } from "./handle-messages"
import { handleRecordedAnimations } from "./handle-recorded-animations"
import { handleInspectedAnimation } from "./handle-inspected-animation"

export function createDevToolsClient() {
  handleRecordedAnimations()
  handleInspectedAnimation()
  handleMessages()

  window.postMessage({ type: "clientready" }, "*")
}
