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
import { Leva } from "leva"
import { controlsTheme } from "./Timeline/theme"
import styled from "styled-components"
import { Sidebar, SidebarContainer } from "./Timeline/Sidebar"
import { ValueMarker } from "./Timeline/Keyframes"

/**
 * TODO
 * - Fix port reconnection - 1
 * - Add Github authentication - 4
 * - Edit easing - 2
 * =============================
 * - Spring/steps/glide support - 8
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
 * - Zoom in/out timeline - 8
 * =============================
 * - Multi-select keyframes - 16
 * =============================
 * - Element-shared keyframes - 16
 * =============================
 * - Reset scrubber - 1
 */

interface Props {
  auth: EditorAuth
}

const getHasRecorded = (state: EditorState) => state.hasRecorded

const ControlsContainer = styled(SidebarContainer)`
  position: fixed;
  top: var(--tab-bar-height);
  right: 0;
  bottom: 0;
  width: 300px;
  padding: 10px;
  z-index: 10;
  border: none;
  border-left: 1px solid var(--feint);

  h2 {
    margin-bottom: 20px;
    font-size: 12px;
  }

  ${ValueMarker} {
    display: inline-block;
    position: static;
    margin-right: 6px;
    background-color: var(--strong-blue);
    transform: translateY(3px) rotate(45deg);
  }
`

const getHasSelectedKeyframes = (state: EditorState) =>
  Boolean(state.selectedKeyframes)

export function Editor({ auth = { isPro: true } }: Props) {
  usePort()

  const hasRecorded = useEditorState(getHasRecorded)
  const hasSelectedKeyframes = useEditorState(getHasSelectedKeyframes)

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
      <ControlsContainer
        style={{ display: hasSelectedKeyframes ? "block" : "none" }}
      >
        <h2>
          <ValueMarker style={{ background: "var(--strong-blue)" }} />
          Edit keyframe
        </h2>
        <Leva fill theme={controlsTheme} flat titleBar={false} hideCopyButton />
      </ControlsContainer>
    </>
  )
}
