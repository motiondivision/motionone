import { motion } from "framer-motion"
import { useRef, useState } from "react"
import styled, { css } from "styled-components"
import { useInViewport } from "../../src/use-in-viewport"
import { Reset } from "../icons/Reset"
import { Switch } from "../icons/Switch"

const Container = styled.div`
  display: flex;
  justify-content: stretch;
  flex-direction: column;
  padding: 6rem 0 6rem;
  border-radius: 10px;
  position: relative;
  margin-bottom: 4rem;
  background: var(--example-background);

  span {
    display: ${({ breakSpan = false }: any) =>
      breakSpan ? `inline` : `block`};
    flex: 1;
    text-align: center;
    font-size: 8.4rem;
    line-height: 5.8rem;
    letter-spacing: -0.72rem;

    @media (max-width: 700px) {
      font-size: 5.8rem;
      line-height: 4.5rem;
      letter-spacing: -0.5rem;
    }

    ${({ isStroke, outline }: any) => {
      if (isStroke) {
        return `
        -webkit-text-stroke-width: 1px;
        -webkit-text-stroke-color: var(--extrusion-color);
        `
      } else if (outline) {
        return css`
          text-shadow: ${({ outline }: any) =>
            extrude({ size: 30, outline, offset: false })};
        `
      }
    }}
    color: var(--text-color);
  }

  &[data-is-extruded="true"],
  &.extrude {
    span {
      ${({ move }: any) => move && `transform: translate(-30px, -30px);`}
      text-shadow: ${({ outline }: any) => extrude({ size: 30, outline })};
      transition: all 600ms cubic-bezier(0.22, 0.12, 0.02, 1.26) 150ms;
    }
  }
` as any

const TextContainer = styled(Container)`
  --example-background: hsl(330, 97%, 86%);
  --text-color: #f4ff5d;
  --extrusion-color: hsl(330, 100%, 56%);
`

const FinalContainer = styled(TextContainer)`
  &[data-is-extruded="true"],
  &.extrude {
    span:nth-child(2) {
      transition-delay: 300ms !important;
    }

    span:nth-child(3) {
      transition-delay: 450ms !important;
    }
  }
`

function extrude({ size = 0, offset = true, increment = 1, outline = false }) {
  let shadow = outline
    ? `${-increment}px ${-increment}px var(--extrusion-color), ${increment}px ${-increment}px var(--extrusion-color), ${increment}px ${increment}px var(--extrusion-color), ${-increment}px ${increment}px var(--extrusion-color), `
    : ""
  // let shadow = ;

  for (let i = 1; i <= size; i++) {
    const pos = offset ? i * increment : 0
    shadow += `${pos}px ${pos}px var(--extrusion-color), `
  }

  return shadow.slice(0, -2)
}

function useReset() {
  const [state, setState] = useState(false)

  return [
    state,
    () => {
      setState(true)
      setTimeout(() => setState(false), 100)
    },
  ]
}

export function FinishedExample() {
  const ref = useRef(null)
  const { isInViewport } = useInViewport(ref)
  const [isResetting, reset] = useReset()

  return (
    <FinalContainer
      ref={ref}
      className="headline"
      data-is-extruded={isInViewport && !isResetting}
      outline
      move
    >
      <span>Animate</span>
      <span>extruded</span>
      <span>text</span>
      <Reset onClick={reset} />
    </FinalContainer>
  )
}

export function StrokeExample() {
  const ref = useRef(null)
  const { isInViewport } = useInViewport(ref)
  const [isResetting, reset] = useReset()

  return (
    <FinalContainer
      ref={ref}
      className="headline"
      data-is-extruded={isInViewport && !isResetting}
      move
      isStroke
    >
      <span>Animate</span>
      <span>extruded</span>
      <span>text</span>
      <Reset onClick={reset} />
    </FinalContainer>
  )
}

const BasicContainer = styled(Container)`
  --example-background: var(--foreground);
  --text-color: var(--background);

  span {
    line-height: 8rem;
    color: var(--text-color);
    text-shadow: 20px 20px var(--error), -20px -20px var(--blue);
  }
`

export function MultipleShadows() {
  return (
    <BasicContainer className="headline">
      <span>Text shadows</span>
    </BasicContainer>
  )
}

const SimpleDepthContainer = styled(BasicContainer)`
  --extrusion-color: var(--error);

  span {
    text-shadow: ${({ depth = 5, increment = 1 }) =>
      extrude({ size: depth, offset: true, increment })};
  }
` as any

export function SimpleDepth(props: any) {
  return (
    <SimpleDepthContainer className="headline" {...props}>
      <span>Text shadows</span>
    </SimpleDepthContainer>
  )
}

function extrude3d(size: number, hue: number) {
  let shadow = ""

  for (let i = 1; i <= size; i++) {
    const lightness = 50 - i * 1.5
    shadow += `${i}px ${i}px hsl(${hue}, 80%, ${lightness}%), `
  }

  return shadow.slice(0, -2)
}

const OldSchoolContainer = styled(BasicContainer)`
  --text-color: hsl(200, 80%, 80%);
  --extrusion-color: hsl(200, 80%, 50%);

  span {
    -webkit-text-stroke-width: 2px;
    transform: translate3d(-20px, -20px, 0);
    text-shadow: ${extrude3d(20, 200)};
  }
`

export function OldSchoolDepthExample() {
  return (
    <OldSchoolContainer className="headline">
      <span>Text shadows</span>
    </OldSchoolContainer>
  )
}

export function CSSTransitionExample() {
  const [isExtruded, setExtruded] = useState(false)

  return (
    <TextContainer className={isExtruded && "extrude"}>
      <span className="headline">Animate</span>
      <span className="headline">extruded</span>
      <span className="headline">text</span>
      <Control>
        <p>
          Toggle <code>extrude</code> class:
        </p>
        <Switch on={isExtruded} onClick={() => setExtruded(!isExtruded)} />
      </Control>
    </TextContainer>
  )
}

export function CSSTransitionDelayExample(props: any) {
  const [isExtruded, setExtruded] = useState(false)

  return (
    <FinalContainer {...props} move className={isExtruded && "extrude"}>
      <span className="headline">Animate</span>
      <span className="headline">extruded</span>
      <span className="headline">text</span>
      <Control>
        <p>
          Toggle <code>extrude</code> class:
        </p>
        <Switch on={isExtruded} onClick={() => setExtruded(!isExtruded)} />
      </Control>
    </FinalContainer>
  )
}

const CSSTransition2Container = styled(TextContainer)`
  padding-bottom: 2rem;
`

export function CSSTransitionExample2() {
  const [isExtruded, setExtruded] = useState(false)

  return (
    <CSSTransition2Container move className={isExtruded && "extrude"}>
      <span className="headline">Animate</span>
      <span className="headline">extruded</span>
      <span className="headline">text</span>
      <Control>
        <p>
          Toggle <code>extrude</code> class:
        </p>
        <Switch on={isExtruded} onClick={() => setExtruded(!isExtruded)} />
      </Control>
    </CSSTransition2Container>
  )
}

const CSSAnimationContainer = styled(TextContainer)`
  padding-bottom: 2rem;
`

export function CSSAnimationExample() {
  const [isExtruded, setExtruded] = useState(true)

  return (
    <CSSAnimationContainer data-is-enabled={isExtruded}>
      <span className="headline">Animate</span>
      <span className="headline">extruded</span>
      <span className="headline">text</span>
      <Control>
        <p>Enable animation:</p>
        <Switch on={isExtruded} onClick={() => setExtruded(!isExtruded)} />
      </Control>
    </CSSAnimationContainer>
  )
}

const textVariants = {
  flat: {
    x: 0,
    y: 0,
    textShadow: extrude({ size: 30, offset: false }),
    transition: { duration: 0.3 },
  },
  extrude: {
    x: -30,
    y: -30,
    textShadow: extrude({ size: 30 }),
    transition: { duration: 0.3 },
  },
}
export function FramerMotionExample() {
  const ref = useRef(null)
  const [isExtruded, setExtruded] = useState(true)

  return (
    <TextContainer
      as={motion.div}
      initial="flat"
      animate={isExtruded ? "extrude" : "flat"}
      ref={ref}
      style={{ overflow: "hidden" }}
    >
      <motion.span variants={textVariants} className="headline">
        Animate
      </motion.span>
      <motion.span variants={textVariants} className="headline">
        extruded
      </motion.span>
      <motion.span variants={textVariants} className="headline">
        text
      </motion.span>
      <Control>
        <p>Enable animation:</p>
        <Switch on={isExtruded} onClick={() => setExtruded(!isExtruded)} />
      </Control>
    </TextContainer>
  )
}

const Control = styled.div`
  background: var(--foreground);
  border-radius: 50px;
  margin: 50px auto 0;
  padding: 10px 10px 10px 15px;
  display: flex;
  align-items: center;

  p {
    margin: 0 10px 0 0;
  }
`
