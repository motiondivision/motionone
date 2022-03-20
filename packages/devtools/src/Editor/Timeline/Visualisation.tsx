import * as React from "react"
import { AnimationMetadata } from "../../types"
import styled from "styled-components"
import { TimeMarkers } from "./TimeMarkers"
import { Keyframes } from "./Keyframes"
import { PlaybackControls } from "./PlaybackControls"
import { RectReadOnly } from "react-use-measure"

interface Props {
  animation: AnimationMetadata
  timelineRect: RectReadOnly
}

const Container = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  flex: 1;
`

export function Visualisation({ animation, timelineRect }: Props) {
  const containerRef = React.useRef(null)
  return (
    <Container ref={containerRef}>
      <TimeMarkers
        timelineRect={timelineRect}
        currentTime={animation.currentTime}
        containerRef={containerRef}
      />
      <Keyframes animation={animation} />
      <PlaybackControls />
    </Container>
  )
}
