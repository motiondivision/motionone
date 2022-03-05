import * as React from "react"
import styled from "styled-components"
import { tabBarHeight } from "../styles"

interface Props {
  isRecording: boolean
  startRecording: VoidFunction
  stopRecording: VoidFunction
}

const Button = styled.button`
  height: ${tabBarHeight}px;
  flex: 0 0 ${tabBarHeight}px;
  position: relative;
`

const Icon = styled.div`
  clip-path: circle(18%);
  text-indent: -1000px;
  position: absolute;
  inset: 0;
`

export function RecordButton({
  isRecording,
  startRecording,
  stopRecording,
}: Props) {
  return (
    <Button onClick={isRecording ? stopRecording : startRecording}>
      <Icon
        style={{
          backgroundColor: isRecording ? "var(--red)" : "rgba(255,255,255,0.5)",
        }}
      >
        {isRecording ? "Stop recording" : "Start recording"}
      </Icon>
    </Button>
  )
}
