import * as React from "react"
import { usePort } from "./state/use-port"
import { Instructions } from "./Instructions"
import { TabBar } from "./TabBar/index"
import { Timeline } from "./Timeline/index"
import { useEditorState } from "./state/use-editor-state"

/**
 * TODO
 * - Add inspect icon - .5
 * - Add timeline visualisation - 8
 * - Fix port reconnection - 1
 * - Add Github authentication - 4
 * =============================
 * - Show values when clicking on keyframe - 4
 * =============================
 * - Add transition button to each keyframe - 8
 * =============================
 * - Scrub animation - 8
 * - Pause/play/restart - 8
 * =============================
 * - Edit inspected values - 1
 * =============================
 * - Spring/glide support - 8
 * =============================
 * - Move keyframes - 8
 * =============================
 * - Delete keyframes - .5
 * =============================
 * - Add keyframes - 4
 * =============================
 * - Add new values to element - 1
 * =============================
 * - Zoom in/out timeline - 8
 * =============================
 * - Multi-select keyframes - 16
 * =============================
 * - Element-shared keyframes - 16
 */

export function Editor() {
  const port = usePort()
  const state = useEditorState(port)

  return (
    <>
      <TabBar state={state} />
      {state.hasRecorded ? <Timeline state={state} /> : <Instructions />}
    </>
  )
}
