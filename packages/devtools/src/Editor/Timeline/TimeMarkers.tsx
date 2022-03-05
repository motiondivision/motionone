import * as React from "react"
import styled from "styled-components"
import useMeasure from "react-use-measure"

interface Props {
  scale: number
}

const Container = styled.div`
  margin-left: calc(-1 * var(--sidebar-width) - 20px);
  padding-left: calc(var(--sidebar-width) + 20px);
  flex: 0 0 var(--row-height);
  background-color: var(--feint);
  position: sticky;
  top: 0;
  display: flex;
  align-items: center;
  overflow: hidden;
`

const Marker = styled.div`
  --marker-padding: 10px;
  padding-left: var(--marker-padding);
  color: var(--white);
  font-weight: bold;
  flex: 0 0 calc(var(--marker-width) - var(--marker-padding));
`

// TODO Automatically generate
const increment = 0.5

function generateMarkers(totalWidth: number, scale: number) {
  if (!totalWidth) return null

  const numVisibleSeconds = totalWidth / scale
  const numMarkers = Math.ceil(numVisibleSeconds / increment)

  const markers = []

  for (let i = 0; i < numMarkers; i++) {
    markers.push(
      <Marker style={{ "--marker-width": increment * scale + "px" } as any}>
        {increment * i}
      </Marker>
    )
  }

  return markers
}

export function TimeMarkers({ scale }: Props) {
  const [ref, { width }] = useMeasure()

  return <Container ref={ref}>{generateMarkers(width, scale)}</Container>
}
