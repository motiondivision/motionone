import Link from "next/link"
import React, { useEffect, useRef, useState } from "react"
import styled from "styled-components"
import { animated } from "../animated"
import { mix } from "popmotion"
import { animate, stagger } from "motion"

interface USPProps {
  color: string
  title: string
  cta?: string
  blurb: JSX.Element
  example: JSX.Element
  ctaLabel?: string
}

function USP({
  color,
  title,
  blurb,
  example,
  cta,
  ctaLabel = "Learn more",
}: USPProps) {
  return (
    <USPContainer style={{ "--color": color } as any}>
      <BlurbContainer>
        <Header>{title}</Header>
        {blurb}
        {cta && (
          <div style={{ marginTop: 20 }}>
            <Link href={cta}>{ctaLabel}</Link>
          </div>
        )}
      </BlurbContainer>
      <Example>{example}</Example>
    </USPContainer>
  )
}

export const shadow = `
  background-color: transparent;
  background-image: radial-gradient(transparent 1px, var(--background) 1px);
  background-size: 5px 5px;
  opacity: 0.9;
`

// const shadow = `background: repeating-linear-gradient(
//   -45deg,
//   transparent,
//   transparent 5px,
//   var(--background) 5px,
//   var(--background) 10px
// );`

const medium = "800px"
const small = "650px"

const Header = styled.h2`
  font-size: 56px;
  letter-spacing: -3.3px;
  line-height: 1.2;
  color: var(--color);
  margin: 0;
  padding: 0;
  margin-bottom: 20px;

  @media (max-width: ${medium}) {
    font-size: 36px;
    letter-spacing: -1px;
  }
`

const Container = styled.div`
  margin: 0 auto;
  max-width: 960px;

  p,
  code {
    font-size: 22px;
    line-height: 1.4;
  }

  p code {
    padding: 4px;
  }

  p {
    font-weight: 700;
    letter-spacing: -0.4px;
  }

  @media (max-width: 1040px) {
    margin: 0 45px;
  }

  @media (max-width: ${medium}) {
    margin: 0 var(--padding);

    p {
      font-size: 18px !important;
      letter-spacing: -0.2px;

      code {
        font-size: 16px !important;
      }
    }
    code {
      font-size: 14px !important;
      padding: 15px 18px;
    }
  }
`

const USPContainer = styled.div`
  margin: 150px auto;
  display: grid;
  grid-template-columns: 1fr calc(var(--padding) * 2) 0.8fr;

  @media (max-width: ${small}) {
    grid-template-columns: 1fr;
    margin: 50px auto;
  }

  a {
    display: inline-block;
    background-color: var(--color);
    font-size: 18px;
    letter-spacing: -0.4px;
    line-height: 1;
    font-weight: 700;
    color: var(--black);
    text-decoration: none;
    border-radius: var(--action-radius);
    padding: 15px 20px;
    align-items: center;
  }

  .shadow {
    position: relative;

    &::before,
    &::after {
      content: "";
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
    }

    &::before {
      ${shadow}
      background-position: 100% 100%;
      transform: translate(5px, 5px);
    }

    &::after {
      border: 4px solid var(--background);
      background: var(--color);
    }
  }
`

const BlurbContainer = styled.div`
  display: flex;
  flex-direction: column;

  @media (max-width: ${small}) {
    margin-bottom: 50px;
  }
`

const CodeContainer = styled.code`
  background: var(--feint);
  padding: 20px 25px;
  border-radius: var(--action-radius);
  display: inline-block;
  margin-top: 20px;
  margin-bottom: 40px;
  font-size: 18px !important;

  @media (max-width: ${small}) {
    font-size: 14px !important;
  }
`

const Example = styled.div`
  border-radius: var(--action-radius);
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--color);
  grid-column: 3;

  @media (max-width: ${small}) {
    grid-column: 1;
  }
`

export function USPs() {
  return (
    <Container>
      <USP
        title="Shockingly simple."
        blurb={
          <>
            <p>
              Motion One packs the power of the Web Animations API into a
              minimal API.
            </p>
            <p>
              It adds new features like selectors, individual transforms,
              timeline sequencing and more.
            </p>
            <CodeContainer>
              {`animate(`}
              <span style={{ color: "var(--splash)" }}>{`"#ball"`}</span>
              {`, {`}
              <span style={{ color: "var(--yellow)" }}>{` scale`}</span>
              {`: `}
              <span style={{ color: "var(--pink)" }}>{`1.3`}</span>
              {` })`}
            </CodeContainer>
          </>
        }
        example={<SimpleExample />}
        color="var(--pink)"
        cta="/guides/quick-start"
        ctaLabel="Quick start"
      />
      <USP
        title="Size matters."
        blurb={
          <>
            <p>
              {`A great web experience doesn't just look amazing, it loads fast.`}
            </p>
            <p>
              {`Motion One's `}
              <code>animate</code> function is just 3.3kb, less than half of
              Anime.js.
            </p>
          </>
        }
        example={<SizeExample />}
        color="var(--splash)"
        cta="/guides/feature-comparison"
        ctaLabel="Compare features"
      />
      <USP
        title="Max performance."
        blurb={
          <>
            <p>
              Motion One uses hardware accelerated animations where possible.
            </p>
            <p>
              So your UI stays snappy and responsive, even under heavy
              workloads.
            </p>
          </>
        }
        example={<PerformanceExample />}
        color="var(--yellow)"
        cta="/guides/performance"
        ctaLabel="Performance guide"
      />
      <MoreContainer>
        <Header>And more...</Header>
        <ul>
          <li>
            <h3>Keyframes</h3>
            <p>Simple array syntax for quick animation sequencing.</p>
          </li>
          <li>
            <h3>Timeline</h3>
            <p>Create intricate animations across multiple elements.</p>
          </li>
          <li>
            <h3>Springs</h3>
            <p>Velocity-based springs for naturalistic animation.</p>
          </li>
          <li>
            <h3>Production-ready</h3>
            <p>Written in TypeScript, with full test coverage.</p>
          </li>
          <li>
            <h3>Free for all</h3>
            <p>
              Published under MIT. No annual commercial license to worry about.
            </p>
          </li>
          <li>
            <h3>Old dog, new tricks</h3>
            <p>Created by the author of Framer Motion, Pose, and Popmotion.</p>
          </li>
        </ul>
      </MoreContainer>
    </Container>
  )
}

// <p>Made by the creator of Framer Motion and Popmotion.</p>
// <p>Free for everyone, published under MIT.</p>

const MoreContainer = styled.div`
  ul {
    display: grid;
    grid-template-columns: 0.5fr 0.5fr;
  }

  h3 {
    font-size: 36px;
    letter-spacing: -0.8px;
    margin-bottom: 20px;
    color: var(--primary);

    span {
      font-size: 24px;
      color: rgba(133, 150, 193, 0.4);
    }
  }

  ul,
  li {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  li {
    margin-bottom: 20px;
    padding-right: 40px;
  }

  @media (max-width: ${small}) {
    h3 {
      font-size: 24px;
      letter-spacing: -0.4px;
    }

    ul {
      grid-template-columns: 1fr;
    }

    li {
      padding: 0;
    }
  }
`

function SimpleExample() {
  const shadow = (size: number) =>
    `circle(${size}px at calc(50% + 5px) calc(50% + 5px))`

  const options = {
    offset: [0, 0.3, 0.5, 0.8, 1],
    repeat: Infinity,
    duration: 3,
    easing: [[0.17, 0.02, 0.22, 1], "linear", [0.17, 0.02, 0.22, 1], "linear"],
  }

  return (
    <SimpleContainer style="static" inViewport="animate">
      <CircleShadow
        poses={{
          static: {
            clipPath: shadow(65),
          },
          animate: {
            clipPath: [
              shadow(65),
              shadow(105),
              shadow(105),
              shadow(65),
              shadow(65),
            ],
            options: options as any,
          },
        }}
      />
      <Circle
        poses={{
          static: {
            scale: 1,
          },
          animate: {
            scale: [1, 1.4, 1.4, 1, 1],
            options: options as any,
          },
        }}
        style={{ transformOrigin: "90% 90%" }}
      />
    </SimpleContainer>
  )
}

const CircleShadow = styled(animated.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  ${shadow}
`

const SimpleContainer = styled(animated.div)`
  height: 300px;
  width: 100%;
  position: relative;
`

const Circle = styled(animated.div)`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  border: 4px solid var(--background);
  background: var(--color);
  position: absolute;
  top: calc(50% - 80px);
  left: calc(50% - 80px);
  will-change: transform;
`

function SizeExample() {
  return (
    <SizeContainer
      style="static"
      inViewport="animate"
      viewport={{ once: true }}
    >
      <Bar size={3.3} i={0} label="Motion One" />
      <Bar size={7} i={1} label="Anime.js" />
      <Bar size={23} i={2} label="Greensock" />
    </SizeContainer>
  )
}

const SizeContainer = styled(animated.div)`
  height: 280px;
  color: var(--background);
  width: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: space-evenly;
  font-size: 18px;
  font-weight: 700;
  letter-spacing: -1px;
  line-height: 1.4;
  text-align: center;
  padding-bottom: var(--padding);
`

function Bar({ size, label, i }: any) {
  const p = size / 23

  return (
    <div>
      {size}
      <BarGraphic
        poses={{
          static: { height: "0px", options: { duration: 0 } },
          animate: {
            height: `${200 * p}px`,
            options: { duration: p * 5, delay: 0.2 + i * 0.2 },
          },
        }}
        className="shadow"
      />
      <span style={{ paddingTop: 10 }}>{label}</span>
    </div>
  )
}

const BarGraphic = styled(animated.div)`
  width: 100px;
  margin-top: 5px;
  margin-bottom: 10px;

  &::before,
  &::after {
    border-radius: var(--action-radius);
  }
`

const spinnerClassName = "perf-loading-spinner"
const hide = (node: HTMLElement) => (node.style.opacity = "0")
const show = (node: HTMLElement) => (node.style.opacity = "1")
function PerformanceSquare({ id, isPlaying, stutter = false }: any) {
  useEffect(() => {
    if (!isPlaying) return

    const options = {
      repeat: Infinity,
      duration: 2,
      direction: "alternate",
      easing: [0.2, 0, 0.8, 1],
    }

    const xAnimation = animate(
      `#${id} .box`,
      { x: [-120, 120] },
      options as any
    )
    const shadowAnimation = animate(
      `#${id} .box-shadow`,
      {
        clipPath: [
          "inset(10px calc(320px - 90px) 0 0 round var(--action-radius))",
          "inset(10px 0 0 calc(320px - 90px) round var(--action-radius))",
        ],
      },
      options as any
    )

    let stutterTimeout: NodeJS.Timeout
    const loadingSpinners = document.querySelectorAll(`.${spinnerClassName}`)

    if (stutter) {
      const pause = () => {
        shadowAnimation.currentTime = xAnimation.currentTime
        xAnimation.pause()
        shadowAnimation.pause()
        loadingSpinners.forEach(show)
        scheduleResume()
      }

      const resume = () => {
        shadowAnimation.currentTime = xAnimation.currentTime
        xAnimation.play()
        shadowAnimation.play()
        loadingSpinners.forEach(hide)
        schedulePause()
      }

      const scheduleResume = () => {
        stutterTimeout = setTimeout(resume, mix(200, 500, Math.random()))
      }

      const schedulePause = () => {
        stutterTimeout = setTimeout(pause, mix(700, 1500, Math.random()))
      }

      schedulePause()
    }

    return () => {
      xAnimation.stop()
      shadowAnimation.stop()
      loadingSpinners.forEach(hide)
      clearTimeout(stutterTimeout)
    }
  }, [isPlaying])

  return (
    <SquareExample id={id}>
      <SquareBackground
        className="box-shadow"
        style={{
          width: 320,
          clipPath:
            "inset(10px calc(320px - 90px) 0 0 round var(--action-radius))",
        }}
      />
      <Square className="box">
        <LoadingSpinner className={spinnerClassName} style={{ opacity: 0 }}>
          <LoadingSpinnerIcon isPlaying={isPlaying} />
        </LoadingSpinner>
      </Square>
    </SquareExample>
  )
}

const LoadingSpinner = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    transform: scale(0.7);
  }

  path {
    fill: var(--background);
  }
`

const SquareExample = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  position: relative;
  width: 100%;
  margin: 10px;
`

const SquareBackground = styled(animated.div)`
  color: var(--background);
  position: absolute;
  top: 0;
  height: 95px;
  width: 320px;
  ${shadow}

  p {
    font-size: 18px;
  }
`

const Square = styled(animated.div)`
  background: var(--color);
  border: 4px solid var(--background);
  border-radius: var(--action-radius);
  width: 80px;
  height: 80px;
  margin-bottom: 10px;
  position: relative;
  will-change: transform;
`

const path =
  "M 0 2.791 C 0 1.249 1.249 0 2.791 0 L 14.651 0 C 16.192 0 17.442 1.249 17.442 2.791 L 17.442 2.791 C 17.442 4.332 16.192 5.581 14.651 5.581 L 2.791 5.581 C 1.249 5.581 0 4.332 0 2.791 Z"

function LoadingSpinnerIcon({ isPlaying }: any) {
  const a = useRef<SVGPathElement>(null)
  const b = useRef<SVGPathElement>(null)
  const c = useRef<SVGPathElement>(null)
  const d = useRef<SVGPathElement>(null)
  const e = useRef<SVGPathElement>(null)
  const f = useRef<SVGPathElement>(null)
  const g = useRef<SVGPathElement>(null)
  const h = useRef<SVGPathElement>(null)
  useEffect(() => {
    if (!isPlaying) return

    const animation = animate(
      [
        a.current!,
        b.current!,
        c.current!,
        d.current!,
        e.current!,
        f.current!,
        g.current!,
        h.current!,
      ].reverse(),
      { opacity: [1, 1, 0, 0, 1] },
      {
        delay: stagger(0.08),
        duration: 0.08 * 8,
        offset: [0, 0.4, 0.9, 0.99, 1],
        repeat: Infinity,
      }
    )

    animation.finished.catch(() => {})

    return () => animation.stop()
  }, [isPlaying])
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="63"
      height="63"
      viewBox="0 0 63 63"
    >
      <g transform="translate(28.709 1.5)">
        <path
          ref={h}
          d={path}
          transform="translate(-5.93 5.93) rotate(-90 8.721 2.791)"
        ></path>
        <path
          ref={d}
          d={path}
          transform="translate(-5.93 48.488) rotate(-90 8.721 2.791)"
        ></path>
      </g>
      <g transform="translate(28.709 1.5) rotate(90 2.791 30)">
        <path
          ref={f}
          d={path}
          transform="translate(-5.93 5.93) rotate(-90 8.721 2.791)"
        ></path>
        <path
          ref={b}
          d={path}
          transform="translate(-5.93 48.488) rotate(-90 8.721 2.791)"
        ></path>
      </g>
      <g transform="translate(28.709 1.5) rotate(45 2.791 30)">
        <path
          ref={g}
          d="M 2.791 17.442 C 1.249 17.442 -0 16.192 -0 14.651 L 0 2.791 C 0 1.249 1.249 0 2.791 0 L 2.791 0 C 4.332 0 5.581 1.249 5.581 2.791 L 5.581 14.651 C 5.581 16.192 4.332 17.442 2.791 17.442 Z"
        ></path>
        <path
          ref={c}
          d="M 2.791 60 C 1.249 60 0 58.751 0 57.209 L 0 45.349 C 0 43.808 1.249 42.558 2.791 42.558 L 2.791 42.558 C 4.332 42.558 5.581 43.808 5.581 45.349 L 5.581 57.209 C 5.581 58.751 4.332 60 2.791 60 Z"
        ></path>
      </g>
      <g transform="translate(28.709 1.5) rotate(135 2.791 30)">
        <path
          ref={e}
          d="M 2.791 17.442 C 1.249 17.442 0 16.192 0 14.651 L 0 2.791 C 0 1.249 1.249 0 2.791 0 L 2.791 0 C 4.332 0 5.581 1.249 5.581 2.791 L 5.581 14.651 C 5.581 16.192 4.332 17.442 2.791 17.442 Z"
        ></path>
        <path
          ref={a}
          d="M 2.791 60 C 1.249 60 -0 58.751 -0 57.209 L 0 45.349 C 0 43.808 1.249 42.558 2.791 42.558 L 2.791 42.558 C 4.332 42.558 5.581 43.808 5.581 45.349 L 5.581 57.209 C 5.581 58.751 4.332 60 2.791 60 Z"
        ></path>
      </g>
    </svg>
  )
}

function PerformanceExample() {
  const [isPlaying, setPlay] = useState(false)

  return (
    <PerformanceContainer
      onViewportEnter={() => setPlay(true)}
      onViewportLeave={() => setPlay(false)}
    >
      <PerformanceSquare id="motion" isPlaying={isPlaying} />
      <p style={{ fontSize: 18 }}>Accelerated animations</p>
      <PerformanceSquare
        id="stutter"
        stutter
        isPlaying={isPlaying}
        // xAnimation={{
        //   x: [-120, -80, -80, 80, 80, 120],
        //   options: stutterOptions,
        // }}
        // shadowAnimation={{
        //   clipPath: [0, 0.166, 0.166, 0.833, 0.833, 1].map((p) => {
        //     const left = mix(10, 225, p)
        //     const right = mix(225, 10, p)
        //     return `inset(10px ${Math.round(right)}px 0 ${Math.round(
        //       left
        //     )}px round var(--action-radius))`
        //   }),
        //   options: stutterOptions,
        // }}
      />
      <p style={{ fontSize: 18 }}>Normal (simulated)</p>
    </PerformanceContainer>
  )
}

const PerformanceContainer = styled(animated.div)`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
  color: var(--background);
  padding-top: 10px;
  p {
    letter-spacing: -1px;
  }

  ${Circle} {
    width: 80px;
    height: 80px;
    position: static;
    margin: 20px;
  }
`
