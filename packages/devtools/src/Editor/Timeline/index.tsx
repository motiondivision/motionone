import * as React from "react"
import { EditorStateWithActions } from "../state/types"
import styled from "styled-components"
import { Sidebar } from "./Sidebar"
import { SelectedKeyframes } from "./SelectedKeyframes"
import { Visualisation } from "./Visualisation"
import { AnimatePresence, motion } from "framer-motion"

const Container = styled(motion.main)`
  flex: 1;
  display: flex;
  align-items: stretch;
  justify-content: flex-start;
  overflow: auto;
  --row-height: 34px;
  --sidebar-width: 220px;
`

const Content = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: flex-start;
  flex: 1;
`

export function Timeline({ state }: { state: EditorStateWithActions }) {
  let children: any = null

  if (state.selected) {
    const selectedAnimation = state.animations[state.selected]

    if (selectedAnimation) {
      children = (
        <Container key={state.selected}>
          <Content>
            <Sidebar animation={selectedAnimation} />
            <Visualisation state={state} animation={selectedAnimation} />
            <AnimatePresence>
              {state.selectedKeyframes ? (
                <SelectedKeyframes
                  selectedKeyframes={state.selectedKeyframes}
                  animation={selectedAnimation}
                />
              ) : null}
            </AnimatePresence>
          </Content>
        </Container>
      )
    }
  }

  return <>{children}</>
}
