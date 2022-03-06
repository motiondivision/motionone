import * as React from "react"
import styled from "styled-components"
import { motion } from "framer-motion"
import { SelectedKeyframeMetadata } from "../state/types"
import { SidebarContainer } from "./Sidebar"
import { AnimationMetadata } from "../../types"
import { ValueMarker } from "./Keyframes"

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
  const elementAnimation = animation[elementName]
  const valueAnimation = elementAnimation.find(
    (thisAnimation) => thisAnimation.valueName === valueName
  )

  if (!valueAnimation) return null

  const { keyframes, options } = valueAnimation
  const { easing } = options
  const easingString = Array.isArray(easing) ? easing[index - 1] : easing

  return (
    <Container
      as={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <Header>Value</Header>
      <code>{keyframes[index]}</code>
      {easingString ? (
        <>
          <Header>Easing</Header>
          <code>{easing}</code>
        </>
      ) : null}
    </Container>
  )
}
