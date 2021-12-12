import styled from "styled-components"
import { useState, useRef, useEffect } from "react"
import { animate } from "motion"
import { screenM } from "../template/vars"

export const ExampleContainer = styled.div`
  --color: var(--success);
  border-radius: 10px;
  border: 2px solid var(--color);
  margin-top: calc(var(--padding) * 2);
  margin-bottom: calc(var(--padding) * 2);
  padding: calc(var(--padding) * 2) var(--padding);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  @media (min-width: ${screenM}) {
    grid-column-start: gutter-left !important;
    grid-column-end: gutter-right !important;
  }
`

export const Ball = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: var(--color);
`

export const Play = styled.button`
  position: absolute;
  bottom: calc(var(--padding) / 2);
  left: calc(var(--padding) / 2);
  border: 2px solid var(--color);
  border-radius: var(--action-radius);
  color: var(--color);
  background: transparent;
  padding: 8px 10px;
`

export function PlayButton({
  onClick,
  children = "Play",
  replayLabel = children,
  style = {},
}: any) {
  const [hasPlayed, setHasPlayed] = useState(false)

  return (
    <Play
      onClick={() => {
        onClick()
        setHasPlayed(true)
      }}
      style={style}
    >
      {hasPlayed ? replayLabel : children}
    </Play>
  )
}

export function Stop() {
  const ref = useRef<HTMLDivElement>(null)

  const play = () => {
    const animation = animate(
      ref.current!,
      { opacity: [1, 0] },
      { duration: 1, easing: "ease-out" }
    )
    setTimeout(() => animation.stop(), 500)
  }

  return (
    <ExampleContainer>
      <PlayButton onClick={play} replayLabel="Replay" />
      <Ball ref={ref} />
    </ExampleContainer>
  )
}

export function Cancel() {
  const ref = useRef<HTMLDivElement>(null)

  const play = () => {
    const animation = ref.current!.animate(
      { opacity: [1, 0] },
      { duration: 1000, easing: "ease-out" }
    )
    setTimeout(() => animation.cancel(), 500)
  }

  return (
    <ExampleContainer>
      <PlayButton onClick={play} replayLabel="Replay" />
      <Ball ref={ref} />
    </ExampleContainer>
  )
}

export function PersistentWAAPI() {
  const ref = useRef<HTMLDivElement>(null)

  const play = () =>
    ref.current!.animate({ opacity: [1, 0] }, { duration: 500 })

  return (
    <ExampleContainer>
      <PlayButton onClick={play} replayLabel="Replay" />
      <Ball ref={ref} />
    </ExampleContainer>
  )
}

export function PersistentMotion() {
  const ref = useRef<HTMLDivElement>(null)

  const play = () =>
    animate(ref.current!, { opacity: [1, 0] }, { duration: 0.5 })

  return (
    <ExampleContainer>
      <PlayButton onClick={play} replayLabel="Replay" />
      <Ball ref={ref} />
    </ExampleContainer>
  )
}

export function InterruptWAAPI() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    ref.current!.animate(
      { transform: ["none", "translateX(300px)"] },
      { duration: 2000, iterations: Infinity, direction: "alternate" }
    )
  }, [])

  const play = () => {
    ref.current!.animate({ transform: "none" }, { duration: 500 })
  }

  return (
    <ExampleContainer
      style={{ justifyContent: "flex-start", overflow: "hidden" }}
    >
      <PlayButton onClick={play}>Interrupt</PlayButton>
      <Ball ref={ref} />
    </ExampleContainer>
  )
}

export function InterruptMotion() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    animate(
      ref.current!,
      { transform: ["none", "translateX(300px)"] },
      { duration: 2, repeat: Infinity, direction: "alternate" }
    )
  }, [])

  const play = () => {
    animate(ref.current!, { transform: "none" }, { duration: 0.5 })
  }

  return (
    <ExampleContainer
      style={{ justifyContent: "flex-start", overflow: "hidden" }}
    >
      <PlayButton onClick={play}>Interrupt</PlayButton>
      <Ball ref={ref} />
    </ExampleContainer>
  )
}
