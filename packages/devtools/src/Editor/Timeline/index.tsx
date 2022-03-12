import * as React from "react"
import styled from "styled-components"
import { Sidebar } from "./Sidebar"
import { SelectedKeyframes } from "./SelectedKeyframes"
import { AnimatePresence, motion } from "framer-motion"
import { EditorState } from "../state/types"
import { useEditorState } from "../state/use-editor-state"
import { TimeMarkers } from "./TimeMarkers"
import { Keyframes } from "./Keyframes"
import { PlaybackControls } from "./PlaybackControls"
import useMeasure from "react-use-measure"
import mergeRefs from "react-merge-refs"

const Container = styled(motion.main)`
  display: flex;
  overflow: overlay;
  flex: 1;
  --row-height: 34px;
  --sidebar-width: 220px;
`

const Content = styled.div`
  display: grid;
  grid-template-columns: var(--sidebar-width) 1fr;
`

const Visualisation = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  flex: 1;
`

const getTimelineState = (state: EditorState) => ({
  animations: state.animations,
  selected: state.selectedAnimationName,
  selectedKeyframes: state.selectedKeyframes,
})

export function Timeline() {
  let children: any = null
  const ref = React.useRef<HTMLElement>(null)
  const [measureRef, rect] = useMeasure()

  const { animations, selected, selectedKeyframes } =
    useEditorState(getTimelineState)

  if (selected) {
    const selectedAnimation = animations[selected]

    if (selectedAnimation) {
      children = (
        <Container ref={mergeRefs([ref, measureRef])} key={selected}>
          <Content>
            <Sidebar animation={selectedAnimation} />
            <Visualisation>
              <TimeMarkers
                containerRef={ref}
                timelineRect={rect}
                currentTime={selectedAnimation.currentTime}
              />
              <Keyframes animation={selectedAnimation} />
              <PlaybackControls />
            </Visualisation>
            <AnimatePresence>
              {selectedKeyframes ? (
                <SelectedKeyframes
                  selectedKeyframes={selectedKeyframes}
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
