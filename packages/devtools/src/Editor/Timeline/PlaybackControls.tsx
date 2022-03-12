import * as React from "react"
import { useEffect } from "react"
import { PlayIcon } from "../icons/PlayIcon"
import { PauseIcon } from "../icons/PauseIcon"
import { useEditorState } from "../state/use-editor-state"
import { getPlayback, getSelectedAnimation } from "../state/selectors"
import styled from "styled-components"
import sync, { cancelSync, FrameData } from "framesync"

const Container = styled.div`
  background-color: var(--feint);
  position: fixed;
  bottom: 10px;
  left: calc(var(--sidebar-width) + 10px);
  border-radius: 20px;
  padding: 8px 12px;
  display: flex;
  align-items: center;
  z-index: 4;
  backdrop-filter: blur(4px);

  span {
    display: block;
    font-weight: bold;
  }
`

const PlaybackToggle = styled.button`
  padding: 0;
  margin-right: 8px;

  svg {
    width: 16px;
    height: 16px;
    fill: var(--white);
  }
`

export function PlaybackControls() {
  const { playbackOrigin, startPlaying, stopPlaying, scrubTo } =
    useEditorState(getPlayback)

  useEffect(() => {
    if (!playbackOrigin) return

    const onFrame = ({ timestamp }: FrameData) => {
      const delta = timestamp - playbackOrigin.startedAt
      scrubTo((playbackOrigin.originTime + delta) / 1000)
    }

    sync.update(onFrame, true)

    return () => cancelSync.update(onFrame)
  }, [playbackOrigin])

  return (
    <Container>
      <PlaybackToggle onClick={playbackOrigin ? stopPlaying : startPlaying}>
        {playbackOrigin ? <PauseIcon /> : <PlayIcon />}
      </PlaybackToggle>
      <CurrentTime />
    </Container>
  )
}

function CurrentTime() {
  const currentAnimation = useEditorState(getSelectedAnimation)

  if (!currentAnimation) return null

  return <span>{currentAnimation.currentTime.toFixed(2)}</span>
}
