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

/**
 * TODO
 * - Fix port reconnection - 1
 * - Add Github authentication - 4
 * =============================
 * - Spring/glide support - 8
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
 * - Zoom in/out timeline - 8
 * =============================
 * - Multi-select keyframes - 16
 * =============================
 * - Reset scrubber - 1
 * =============================
 * - Element-shared keyframes - 16
 * =============================
 * - Input validation - 16
 * =============================
 * - Custom input fields - 16
 */

interface Props {
  auth: EditorAuth
}

const getHasRecorded = (state: EditorState) => state.hasRecorded

export function Editor({ auth = { isPro: true } }: Props) {
  usePort()

  const hasRecorded = useEditorState(getHasRecorded)

  if (!auth.isPro) {
    return <LoginDialog />
  }

  return (
    <>
      <TabBar />
      <AnimatePresence exitBeforeEnter>
        {hasRecorded ? (
          <Timeline key="timeline" />
        ) : (
          <Instructions key="instructions" />
        )}
      </AnimatePresence>
    </>
  )
}
