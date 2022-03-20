import { Leva } from "leva"
import * as React from "react"
import styled from "styled-components"
import { EditorState } from "../state/types"
import { useEditorState } from "../state/use-editor-state"
import { ValueMarker } from "../Timeline/Keyframes"
import { SidebarContainer } from "../Timeline/Sidebar"
import { KeyframeEditControls } from "./Controls"
import { theme } from "./theme"

const Container = styled(SidebarContainer)`
  position: fixed;
  top: var(--tab-bar-height);
  right: 0;
  bottom: 0;
  width: 300px;
  padding: 5px 10px;
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

const getSelectedKeyframes = (state: EditorState) => state.selectedKeyframes

export function KeyframeEditPanel() {
  const selectedKeyframes = useEditorState(getSelectedKeyframes)

  return (
    <Container style={{ display: selectedKeyframes ? "block" : "none" }}>
      <h2>
        <ValueMarker style={{ background: "var(--strong-blue)" }} />
        Edit keyframe
      </h2>
      <Leva fill theme={theme} flat titleBar={false} hideCopyButton />
      {selectedKeyframes ? (
        <KeyframeEditControls selectedKeyframes={selectedKeyframes} />
      ) : null}
    </Container>
  )
}
