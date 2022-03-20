import * as React from "react"
import { useEffect, useMemo, useState } from "react"
import styled from "styled-components"
import { EditorState } from "../state/types"
import { Scrubber, DragOrigin, scrubberHalfWidth } from "./Scrubber"
import { useEditorState } from "../state/use-editor-state"
import { getPlayback } from "../state/selectors"
import { RectReadOnly } from "react-use-measure"

interface Props {
  currentTime: number
  timelineRect: RectReadOnly
  containerRef: React.RefObject<HTMLElement>
}

const MarkerBackground = styled.div`
  background-color: var(--feint);
  backdrop-filter: brightness(50%) blur(3px);
  position: fixed;
  left: 0;
  right: 0;
  top: var(--tab-bar-height);
  height: var(--row-height);
  z-index: 2;
`

const Container = styled.div`
  margin-left: calc(-1 * var(--sidebar-width) - 40px);
  padding-left: calc(var(--sidebar-width) + 40px);
  flex: 0 0 var(--row-height);
  position: sticky;
  top: 0;
  display: flex;
  align-items: center;
  z-index: 3;
`

const Marker = styled.div`
  --marker-padding: 10px;
  padding-left: var(--marker-padding);
  color: var(--white);
  font-weight: bold;
  flex: 0 0 calc(var(--marker-width));
`

// TODO Automatically generate from scale
const increment = 0.5

function generateMarkers(totalWidth: number, scale: number) {
  if (!totalWidth) return null

  const numVisibleSeconds = totalWidth / scale
  const numMarkers = Math.ceil(numVisibleSeconds / increment)

  const markers = []

  for (let i = 0; i < numMarkers; i++) {
    const time = increment * i
    markers.push(
      <Marker
        key={time}
        style={{ "--marker-width": increment * scale + "px" } as any}
      >
        {time}
      </Marker>
    )
  }

  return markers
}

const getTimeScale = (state: EditorState) => state.scale
const getScrubTo = (state: EditorState) => state.scrubTo

export function TimeMarkers({
  currentTime,
  timelineRect,
  containerRef,
}: Props) {
  const [dragOrigin, setDragOrigin] = useState<DragOrigin | undefined>(
    undefined
  )

  const scale = useEditorState(getTimeScale)
  const scrubTo = useEditorState(getScrubTo)
  const { stopPlaying } = useEditorState(getPlayback)

  const markers = useMemo(
    () => generateMarkers(timelineRect.width, scale),
    [timelineRect.width, scale]
  )

  useEffect(() => {
    document.getElementsByTagName("body")[0].style.cursor = dragOrigin
      ? "grabbing"
      : ""

    if (!dragOrigin) return

    const handleDrag = (e: MouseEvent) => {
      const deltaX =
        e.pageX +
        containerRef.current!.scrollLeft -
        scrubberHalfWidth -
        dragOrigin.pointerX
      scrubTo(Math.max(0, dragOrigin.time + deltaX / scale))
    }

    const stopDrag = () => setDragOrigin(undefined)

    window.addEventListener("pointermove", handleDrag)
    window.addEventListener("pointerup", stopDrag)

    return () => {
      window.removeEventListener("pointermove", handleDrag)
      window.removeEventListener("pointerup", stopDrag)
    }
  }, [dragOrigin])

  return (
    <>
      <MarkerBackground onClick={(e) => e.stopPropagation()} />
      <Container
        onClick={(e) => e.stopPropagation()}
        onPointerDown={(e) => {
          const pointerX =
            e.pageX + containerRef.current!.scrollLeft - scrubberHalfWidth
          const time = (pointerX - 220) / scale
          stopPlaying()
          setDragOrigin({
            pointerX,
            time,
          })
          scrubTo(Math.max(0, time))
        }}
      >
        {markers}
        <Scrubber
          scale={scale}
          currentTime={currentTime}
          dragOrigin={dragOrigin}
          setDragOrigin={setDragOrigin}
          stopPlaying={stopPlaying}
          timelineHeight={timelineRect.height}
          containerRef={containerRef}
        />
      </Container>
    </>
  )
}
