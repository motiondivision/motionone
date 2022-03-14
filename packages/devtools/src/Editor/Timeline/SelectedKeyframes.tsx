import * as React from "react"
import styled from "styled-components"
import { motion } from "framer-motion"
import { SelectedKeyframeMetadata } from "../state/types"
import { SidebarContainer } from "./Sidebar"
import { AnimationMetadata, ValueAnimationMetadata } from "../../types"
import { ValueMarker } from "./Keyframes"
import { isEasingList } from "@motionone/utils"
import { EasingPreview } from "./EasingPreview"
import { Easing } from "@motionone/types"
import { useEditorState } from "../state/use-editor-state"
import { getUpdateKeyframe } from "../state/selectors"
import { Leva, LevaPanel, useControls } from "leva"
import { bezier } from "@leva-ui/plugin-bezier"

import { createControls } from "./controls"

interface Props {
  animation: AnimationMetadata
  selectedKeyframes: SelectedKeyframeMetadata[]
}

interface HeaderProps {
  children: string
}

const theme = {}

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

interface ControlProps {
  valueAnimation: ValueAnimationMetadata
  keyframeMetadata: SelectedKeyframeMetadata
}

function Control({ keyframeMetadata, valueAnimation }: ControlProps) {
  const updateKeyframe = useEditorState(getUpdateKeyframe)
  const { elementName, valueName, index } = keyframeMetadata
  const { keyframes, options } = valueAnimation
  const { easing } = options
  let keyframeEasing: Easing

  if (index && easing) {
    keyframeEasing = isEasingList(easing) ? easing[index - 1] : easing
    keyframeEasing = Array.isArray(keyframeEasing)
      ? [...keyframeEasing]
      : keyframeEasing
  }

  const controls = {
    [`${elementName} ${valueName} [${index}]`]: {
      ...createControls(valueName, keyframes[index] as string),
      onChange: (newValue: string) =>
        updateKeyframe(keyframeMetadata, newValue),
    },
  }
  if (keyframeEasing) {
    console.log(
      "setting ",
      `${elementName} ${valueName} [${index}] easing`,
      keyframeEasing
    )
    controls[`${elementName} ${valueName} [${index}] easing`] = {
      ...bezier(keyframeEasing),
      label: "Easing",
      transient: true,
      onChange: ([...points]) => console.log(points),
    }
  }

  useControls(controls)

  return null
}

export function SelectedKeyframes({ selectedKeyframes, animation }: Props) {
  // const [value] = selectedKeyframes

  // const { elementName, valueName, index } = value
  // const elementAnimation = animation.elements[elementName]

  // if (!valueAnimation) return null

  // const { keyframes, options } = valueAnimation
  // const { easing } = options
  // let keyframeEasing: Easing
  // let easingString: string | undefined

  // if (index && easing) {
  //   keyframeEasing = isEasingList(easing) ? easing[index - 1] : easing

  //   easingString = Array.isArray(keyframeEasing)
  //     ? cubicBezierAsString(keyframeEasing)
  //     : keyframeEasing
  // }

  const controls = selectedKeyframes.map((keyframeMetadata) => {
    const { elementName, valueName, index } = keyframeMetadata
    const elementAnimation = animation.elements[elementName]

    if (!elementAnimation) return null

    const valueAnimation = elementAnimation.find(
      (thisAnimation) => thisAnimation.valueName === valueName
    )
    return valueAnimation ? (
      <Control
        key={elementName + valueName + index}
        valueAnimation={valueAnimation}
        keyframeMetadata={keyframeMetadata}
      />
    ) : null
  })

  return <>{controls}</>

  // const updateKeyframe = useEditorState(getUpdateKeyframe)

  // const setEasing = (selectedEasing: string) => {}

  // return (
  //   <Container
  //     as={motion.div}
  //     initial={{ opacity: 0 }}
  //     animate={{ opacity: 1 }}
  //     exit={{ opacity: 0 }}
  //     transition={{ duration: 0.2 }}
  //   >
  //     <Header>Value</Header>
  //     <input
  //       className="code"
  //       type="text"
  //       value={keyframes[index]}
  //       onChange={(event) => updateKeyframe(value, event.currentTarget.value)}
  //     />
  //     {easingString ? (
  //       <>
  //         <Header>Easing</Header>
  //         <select
  //           value={getEasingName(easingString)}
  //           name="easing"
  //           onChange={(event) =>
  //             updateKeyframeEasing(value, event.target.value)
  //           }
  //         >
  //           <option value="linear">linear</option>
  //           <option value="ease">ease</option>
  //           <option value="ease-in">ease-in</option>
  //           <option value="ease-out">ease-out</option>
  //           <option value="ease-in-out">ease-in-out</option>
  //           <option value="cubic-bezier">cubic-bezier</option>
  //           <option value="steps">steps</option>
  //         </select>
  //         <EasingContainer>
  //           <EasingPreview easing={easing} />
  //         </EasingContainer>
  //       </>
  //     ) : null}
  //   </Container>
  // )
}

const cubicBezierAsString = ([a, b, c, d]: [number, number, number, number]) =>
  `cubic-bezier(${a}, ${b}, ${c}, ${d})`

const getEasingName = (easing: string) => easing.split("(")[0]
