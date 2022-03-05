import * as React from "react"
import { AnimationMetadata } from "../../types"
import styled from "styled-components"
import { TimeMarkers } from "./TimeMarkers"
import { Keyframes } from "./Keyframes"
import { EditorStateWithActions } from "../state/types"

interface Props {
  state: EditorStateWithActions
  animation: AnimationMetadata
}

const Container = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  flex: 1;
`

export function Visualisation({ animation, state }: Props) {
  const scale = 320 // 1 second = 320px

  return (
    <Container>
      <TimeMarkers scale={scale} />
      <Keyframes state={state} scale={scale} animation={animation} />
    </Container>
  )
}
