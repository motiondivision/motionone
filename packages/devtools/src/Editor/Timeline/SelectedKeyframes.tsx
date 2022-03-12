import * as React from "react"
import styled from "styled-components"
import { motion } from "framer-motion"
import { SelectedKeyframeMetadata } from "../state/types"
import { SidebarContainer } from "./Sidebar"
import { AnimationMetadata } from "../../types"
import { ValueMarker } from "./Keyframes"
import { isEasingList } from "@motionone/utils"
import { EasingPreview } from "./EasingPreview"
import { Easing } from "@motionone/types"
import { useEditorState } from "../state/use-editor-state"
import { getUpdateKeyframe } from "../state/selectors"

interface Props {
  animation: AnimationMetadata
  selectedKeyframes: SelectedKeyframeMetadata[]
}

interface HeaderProps {
  children: string
}

const Container = styled(SidebarContainer)`
  right: 0;
  border-left: 1px solid var(--feint);
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 20px;
  position: absolute;
  top: calc(var(--tab-bar-height) + 1px);
  overflow-y: overlay;
  overflow-x: hidden;
  width: var(--sidebar-width);
  display: flex;
  flex-direction: column;

  input {
    color: var(--white);
    border: none;
    border-bottom: 1px solid var(--feint);
    margin-bottom: 20px;
    -webkit-appearance: none;
    outline: none;
    background: none;
    padding-bottom: 6px;

    &:focus {
      border-color: var(--white);
    }
  }

  h2 {
    margin-bottom: 8px;
    font-size: 12px;
  }

  code {
    font-size: 12px;
    margin-bottom: 20px;
    display: block;
  }

  ${ValueMarker} {
    display: inline-block;
    position: static;
    margin-right: 6px;
    background-color: var(--strong-blue);
    transform: translateY(3px) rotate(45deg);
  }
`

const EasingContainer = styled.div`
  border: 1px solid var(--feint-solid);
  border-radius: 5px;
`

function Header({ children }: HeaderProps) {
  return (
    <h2>
      <ValueMarker style={{ background: "var(--strong-blue)" }} />
      {children}
    </h2>
  )
}

export function SelectedKeyframes({ selectedKeyframes, animation }: Props) {
  const [value] = selectedKeyframes

  const { elementName, valueName, index } = value
  const elementAnimation = animation.elements[elementName]
  const valueAnimation = elementAnimation.find(
    (thisAnimation) => thisAnimation.valueName === valueName
  )

  if (!valueAnimation) return null

  const { keyframes, options } = valueAnimation
  const { easing } = options
  let keyframeEasing: Easing
  let easingString: string | undefined

  if (index && easing) {
    keyframeEasing = isEasingList(easing) ? easing[index - 1] : easing

    easingString = Array.isArray(keyframeEasing)
      ? cubicBezierAsString(keyframeEasing)
      : keyframeEasing
  }

  const updateKeyframe = useEditorState(getUpdateKeyframe)

  return (
    <Container
      as={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <Header>Value</Header>
      <input
        className="code"
        type="text"
        value={keyframes[index]}
        onChange={(event) => updateKeyframe(value, event.currentTarget.value)}
      />
      {easingString ? (
        <>
          <Header>Easing</Header>
          <code>{easingString}</code>
          <EasingContainer>
            <EasingPreview easing={easing} />
          </EasingContainer>
        </>
      ) : null}
    </Container>
  )
}

const cubicBezierAsString = ([a, b, c, d]: [number, number, number, number]) =>
  `cubic-bezier(${a}, ${b}, ${c}, ${d})`
