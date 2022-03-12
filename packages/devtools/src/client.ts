import { createDevToolsClient } from "./client/index"

if (!(window as any).__MOTION_DEV_TOOLS) {
  ;(window as any).__MOTION_DEV_TOOLS = createDevToolsClient()
}
