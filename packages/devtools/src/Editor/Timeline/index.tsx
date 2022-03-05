import * as React from "react"
import { EditorStateWithActions } from "../state/types"
import styled from "styled-components"
import { Sidebar } from "./Sidebar"
import { Visualisation } from "./Visualisation"
import { motion, AnimatePresence } from "framer-motion"

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
  console.log(state)
  if (state.selected) {
    const selectedAnimation = state.animations[state.selected]

    if (selectedAnimation) {
      children = (
        <Container
          key={state.selected}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.3 } }}
          exit={{ opacity: 0, transition: { duration: 0.1 } }}
        >
          <Content>
            <Sidebar animation={selectedAnimation} />
            <Visualisation state={state} animation={selectedAnimation} />
          </Content>
        </Container>
      )
    }
  }

  return <AnimatePresence exitBeforeEnter>{children}</AnimatePresence>
}
