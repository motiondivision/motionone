import * as React from "react"
import styled from "styled-components"

export const scrubberHalfWidth = 16

interface Props {
  scale: number
  currentTime: number
  dragOrigin: DragOrigin | undefined
  setDragOrigin: (origin: Props["dragOrigin"]) => void
  stopPlaying(): void
  timelineHeight: number
  containerRef: React.RefObject<HTMLElement>
}

export interface DragOrigin {
  pointerX: number
  time: number
}

const Container = styled.div`
  position: absolute;
  width: 20px;
  height: var(--row-height);
  cursor: grabber;

  svg {
    position: relative;
    top: 15px;
    left: 5px;
  }
`

const Stick = styled.div`
  width: 1px;
  height: 0;
  background-color: var(--splash);
  position: absolute;
  top: var(--row-height);
  left: 10px;
  pointer-events: none;
`

export function ScrubberIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="20">
      <path
        d="M 0 2.25 C 0 1.145 0.895 0.25 2 0.25 L 9 0.25 C 10.105 0.25 11 1.145 11 2.25 L 11 14.997 C 11 15.721 10.609 16.388 9.977 16.742 L 5.5 19.25 L 1.023 16.742 C 0.391 16.388 0 15.721 0 14.997 Z"
        fill="var(--splash)"
      ></path>
    </svg>
  )
}

export function Scrubber({
  scale,
  currentTime,
  dragOrigin,
  setDragOrigin,
  stopPlaying,
  timelineHeight,
  containerRef,
}: Props) {
  return (
    <Container
      style={{
        transform: `translateX(${scale * currentTime + 7}px)`,
        cursor: dragOrigin ? "grabbing" : "grab",
      }}
      onPointerDown={(e) => {
        e.stopPropagation()
        stopPlaying()
        setDragOrigin({
          pointerX:
            e.pageX + containerRef.current!.scrollLeft - scrubberHalfWidth,
          time: currentTime,
        })
      }}
    >
      <ScrubberIcon />
      <Stick
        onPointerDown={(e) => e.stopPropagation()}
        style={{
          height: `calc(${Math.floor(timelineHeight)}px - var(--row-height))`,
        }}
      />
    </Container>
  )
}
