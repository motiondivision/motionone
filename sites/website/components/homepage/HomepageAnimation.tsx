import { useEffect } from "react"
import styled from "styled-components"
import { timeline } from "motion"
import { shadow } from "./USPs"

const screen = { width: 800, height: 500 }
const cover = { width: 290, height: 190 }

const Container = styled.div`
  overflow: visible;
  position: relative;
  perspective: 1000px;
  transform-style: preserve-3d;

  --thick-line: 4px;
  --thin-line: 2px;

  @media (max-width: 1200px) {
    transform: translate(5px, -61px) scale(0.9);
  }

  @media (max-width: 1080px) {
    transform: translate(0px, 9px) scale(0.9);
    height: 400px;

    --thick-line: 6px;
    --thin-line: 3px;
  }

  @media (max-width: 800px) {
    transform: translate(-70px, -10px) scale(0.75);
    height: 300px;
  }

  @media (max-width: 600px) {
    transform: translate(-70px, -30px) scale(0.5);
    height: 210px;
  }
`

const Screen = styled.div`
  width: ${screen.width}px;
  height: ${screen.height}px;
  background: var(--primary);
  border: var(--thick-line) solid var(--background);
  border-radius: 20px;
  position: absolute;
  top: -20px;
  left: -20px;
  transform: rotateX(15deg) rotateY(-10deg);
  transform-style: preserve-3d;
`

const Chrome = styled.div`
  display: flex;
  position: absolute;
  top: 20px;
  left: 20px;

  > div {
    border-radius: 50%;
    background: var(--primary);
    border: var(--thin-line) solid var(--background);
    width: 15px;
    height: 15px;
    margin-right: 10px;
  }
`

type Size = { width: number; height: number }
type Box = Size & { top: number; left: number }
function drawShadowClip(container: Size, shadow: Box) {
  return `inset(${shadow.top}px ${
    container.width - (shadow.left + shadow.width)
  }px ${container.height - (shadow.top + shadow.height)}px ${
    shadow.left
  }px round 15px)`
}

const popped = "translateZ(100px) scale(1.05)"

export function HomepageAnimation() {
  useEffect(() => {
    const animation = timeline(
      [
        ["#cover-a", { opacity: 0 }],
        ["#cover-e", { opacity: 1 }, { at: "-0.8" }],
        ["#cover-b", { transform: "none" }, { at: "-0.8" }],
        ["#cover-c", { transform: popped }, { at: "-0.8" }],
        [
          "#cover-container",
          {
            transform: [
              "translateX(-240px) translateZ(1px)",
              "translateX(-554px) translateZ(1px)",
              null,
            ],
          },
          { duration: 2.4, at: "-0.8", offset: [0, 0.33, 1] },
        ],
        [
          "#shadow-b",
          {
            clipPath: drawShadowClip(screen, {
              ...cover,
              top: 150,
              left: -180,
            }),
          },
          { duration: 0.8, at: "-2.4" },
        ],
        [
          "#shadow-c",
          {
            clipPath: initialShadow,
          },
          { duration: 0.8, at: "-0.8" },
        ],
      ],
      {
        delay: 0.5,
        repeat: Infinity,
        duration: 3,
        defaultOptions: {
          duration: 0.8,
          easing: "cubic-bezier(0.72, 0, 0.28, 1)" as any,
        },
      }
    )

    return () => animation.stop()
  }, [])

  return (
    <Container>
      <Screen>
        <Chrome>
          <div />
          <div />
          <div />
        </Chrome>
        <CoverAnimation />
      </Screen>
    </Container>
  )
}

const CoverContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
  position: relative;
  top: calc(50% - 100px);
  padding-left: 50px;
  transform: translateX(-240px) translateZ(1px);
  transform-style: preserve-3d;
  will-change: transform;
`

const Cover = styled.div`
  background: var(--primary);
  border: var(--thin-line) solid var(--background);
  width: ${cover.width}px;
  height: ${cover.height}px;
  margin-right: 20px;
  border-radius: var(--action-radius);
  flex-shrink: 0;
  opacity: 1;
  will-change: transform;

  &#cover-e {
    opacity: 0;
  }
`

const initialShadow = drawShadowClip(screen, {
  width: cover.width * 1.15,
  height: cover.height * 1.15,
  left: 105,
  top: 140,
})
const Shadow = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  ${shadow};
  background-image: radial-gradient(transparent 1px, var(--background) 1px);
  background-size: 6px 6px;
  border-radius: var(--action-radius);
  clip-path: ${initialShadow};
  transform: translateZ(0);

  &#shadow-c {
    clip-path: ${drawShadowClip(screen, { ...cover, top: 150, left: 440 })};
  }
`

export function CoverAnimation() {
  return (
    <>
      <CoverContainer id="cover-container">
        <Cover className="cover" id="cover-a" />
        <Cover className="cover" id="cover-b" style={{ transform: popped }} />
        <Cover
          className="cover"
          id="cover-c"
          style={{ opacity: "1 !important" }}
        />
        <Cover className="cover" id="cover-d" />
        <Cover className="cover" id="cover-e" />
      </CoverContainer>
      <Shadow id="shadow-b" />
      <Shadow id="shadow-c" />
    </>
  )
}
