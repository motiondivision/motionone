import * as React from "react"
import styled from "styled-components"
import { RecordIcon } from "../icons/RecordIcon"
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
  text-indent: -1000px;
  display: flex;
  justify-content: center;
  align-items: center;
`

export function RecordButton({
  isRecording,
  startRecording,
  stopRecording,
}: Props) {
  return (
    <Button onClick={isRecording ? stopRecording : startRecording}>
      <RecordIcon
        style={{
          backgroundColor: isRecording ? "var(--red)" : "rgba(255,255,255,0.5)",
        }}
      ></RecordIcon>
      {isRecording ? "Stop recording" : "Start recording"}
    </Button>
  )
}
