import * as React from "react"
import styled from "styled-components"
import { RecordButton } from "./RecordButton"
import { motion } from "framer-motion"
import { useEditorState } from "../state/use-editor-state"
import shallow from "zustand/shallow"
import { EditorState } from "../state/types"

const Container = styled.section`
  flex: 0 0 var(--tab-bar-height);
  border-bottom: 1px solid var(--feint);
  display: flex;
`

const Tabs = styled(motion.ul)`
  display: flex;
  justify-content: flex-start;
  overflow-x: overlay;
  overflow-y: hidden;
  flex: 1;
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

const getTabBarState = (state: EditorState) => ({
  isRecording: state.isRecording,
  startRecording: state.startRecording,
  stopRecording: state.stopRecording,
  animations: state.animations,
  selectAnimation: state.selectAnimation,
  selected: state.selectedAnimationName,
})

export function TabBar() {
  const {
    isRecording,
    startRecording,
    stopRecording,
    animations,
    selectAnimation,
    selected,
  } = useEditorState(getTabBarState, shallow)

  return (
    <Container>
      <RecordButton
        isRecording={isRecording}
        startRecording={startRecording}
        stopRecording={stopRecording}
      />
      <Tabs layoutScroll>
        {Object.keys(animations).map((animationName) => (
          <Tab
            key={animationName}
            onClick={() => selectAnimation(animationName)}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={transition}
          >
            <motion.span
              initial={false}
              animate={{ opacity: animationName === selected ? 1 : 0.65 }}
              transition={{ duration }}
            >
              {animationName}
            </motion.span>
            {animationName === selected ? (
              <Underline layoutId="tab-underline" transition={transition} />
            ) : null}
          </Tab>
        ))}
      </Tabs>
    </Container>
  )
}
