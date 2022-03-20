import * as React from "react"
import { usePort } from "./state/use-port"
import { Instructions } from "./Instructions"
import { TabBar } from "./TabBar/index"
import { Timeline } from "./Timeline/index"
import { AnimatePresence } from "framer-motion"
import { EditorAuth } from "../types"
import { LoginDialog } from "./LoginDialog"
import { useEditorState } from "./state/use-editor-state"
import { EditorState } from "./state/types"
import { KeyframeEditPanel } from "./KeyframeEditPanel"

/**
 * TODO
 * - Fix port reconnection - 1
 * - Add Github authentication - 4
 * - Release 10.7 of Motion One
 * - Submit to Google - 1
 * =============================
 * - CSS animation names - 1
 * =============================
 * - Motion One label - 1
 * =============================
 * - Add unit tests - 8
 * - Add uuid to keyframes - 2
 * - Spring/glide support - 8
 * =============================
 * - Keyboard shortcuts
 *    - Space: Start/stop - 2
 * =============================
 * - Move keyframes - 8
 * =============================
 * - Delete keyframes - .5
 * =============================
 * - Add keyframes - 4
 * =============================
 * - Add keyframe at scrubber position - 2
 * =============================
 * - Add new values to element - 1
 * =============================
 * - Steps visualisation - 8
 * =============================
 * - Zoom in/out timeline - 8
 * =============================
 * - Multi-select keyframes - 16
 * =============================
 * - Element-shared keyframes - 16
 * =============================
 * - Reset scrubber - 1
 */

interface Props {
  user: EditorAuth
}

const getHasRecorded = (state: EditorState) => state.hasRecorded

export function Editor({ user = { isPro: false } }: Props) {
  usePort()

  const hasRecorded = useEditorState(getHasRecorded)

  return user.isPro ? (
    <>
      <TabBar />
      <AnimatePresence exitBeforeEnter>
        {hasRecorded ? (
          <Timeline key="timeline" />
        ) : (
          <Instructions key="instructions" />
        )}
      </AnimatePresence>
      <KeyframeEditPanel />
    </>
  ) : (
    <LoginDialog />
  )
}
