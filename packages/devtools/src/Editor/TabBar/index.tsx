import * as React from "react"
import styled from "styled-components"
import { EditorStateWithActions } from "../state/types"
import { RecordButton } from "./RecordButton"
import { motion } from "framer-motion"

const Container = styled.section`
  flex: 0 0 var(--tab-bar-height);
  border-bottom: 1px solid var(--feint);
  display: flex;
`

const Tabs = styled(motion.ul)`
  display: flex;
  justify-content: flex-start;
  overflow-x: auto;
`

const Tab = styled(motion.li)`
  position: relative;
  cursor: pointer;
  padding: 0 12px 2px;
  font-weight: bold;
  display: flex;
  align-items: center;

  span {
    color: var(--white);
    white-space: nowrap;
  }
`

const Underline = styled(motion.div)`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  background-color: var(--strong-blue);
`

const duration = 0.8
const transition = { type: "spring", duration, bounce: 0 }

export function TabBar({ state }: { state: EditorStateWithActions }) {
  return (
    <Container>
      <RecordButton
        isRecording={state.isRecording}
        startRecording={state.startRecording}
        stopRecording={state.stopRecording}
      />
      <Tabs layoutScroll>
        {Object.keys(state.animations).map((animationName) => (
          <Tab
            key={animationName}
            onClick={() => state.selectAnimation(animationName)}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={transition}
          >
            <motion.span
              initial={false}
              animate={{ opacity: animationName === state.selected ? 1 : 0.65 }}
              transition={{ duration }}
            >
              {animationName}
            </motion.span>
            {animationName === state.selected ? (
              <Underline layoutId="tab-underline" transition={transition} />
            ) : null}
          </Tab>
        ))}
      </Tabs>
    </Container>
  )
}
