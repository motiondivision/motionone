import { DevToolsPlugin } from "../../types"
import { store } from "../state"

export const motionOne: DevToolsPlugin = {
  id: "motion-one",
  onRecordStart: () => {
    ;(window as any).__MOTION_DEV_TOOLS_RECORD =
      store.getState().recordAnimation
  },
  onRecordEnd: () => {
    ;(window as any).__MOTION_DEV_TOOLS_RECORD = undefined
  },
}
