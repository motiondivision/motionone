import * as React from "react"
import { usePort } from "./state/use-port"
import { Instructions } from "./Instructions"
import { TabBar } from "./TabBar/index"
import { Timeline } from "./Timeline/index"
import { useEditorState } from "./state/use-editor-state"
import { AnimatePresence } from "framer-motion"
import { EditorAuth } from "../types"
import { LoginDialog } from "./LoginDialog"

/**
 * TODO
 * - Fix port reconnection - 1
 * - Add Github authentication - 4
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

interface Props {
  auth: EditorAuth
}

export function Editor({ auth = { isPro: true } }: Props) {
  const port = usePort()
  const state = useEditorState(auth, port)

  if (!auth.isPro) {
    return <LoginDialog state={state} />
  }

  return (
    <>
      <TabBar state={state} />
      <AnimatePresence exitBeforeEnter>
        {state.hasRecorded ? (
          <Timeline key="timeline" state={state} />
        ) : (
          <Instructions key="instructions" />
        )}
      </AnimatePresence>
    </>
  )
}
