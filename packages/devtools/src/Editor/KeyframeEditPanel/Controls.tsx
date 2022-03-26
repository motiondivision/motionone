import { bezier } from "@leva-ui/plugin-bezier"
import { BezierDefinition } from "@motionone/types"
import { useControls } from "leva"
import * as React from "react"
import { ValueAnimationMetadata } from "../../types"
import {
  getSelectedAnimation,
  getUpdateKeyframe,
  getUpdateKeyframeEasing,
  getDeleteKeyframe,
} from "../state/selectors"
import { SelectedKeyframeMetadata } from "../state/types"
import { useEditorState } from "../state/use-editor-state"
import { getControlDefinition } from "./definitions"
import styled from "styled-components"
import { TrashIcon } from "../icons/TrashIcon"

interface Props {
  selectedKeyframes: SelectedKeyframeMetadata[]
}

interface ValueControlProps {
  valueAnimation: ValueAnimationMetadata
  keyframeMetadata: SelectedKeyframeMetadata
}

const ActionsContainer = styled.div`
  padding: 20px 0px;
  display: flex;
  flex-direction: column;
`

const DeleteButton = styled.button`
  color: var(--white);
  padding: 10px 15px;
  border-radius: 5px;
  border: 1px solid var(--feint);
  display: flex;
  align-items: center;
  justify-content: center;
`

function ValueControl({ keyframeMetadata, valueAnimation }: ValueControlProps) {
  const controls = {}
  const updateKeyframe = useEditorState(getUpdateKeyframe)
  const updateKeyframeEasing = useEditorState(getUpdateKeyframeEasing)
  const deleteKeyframe = useEditorState(getDeleteKeyframe)
  const { valueName, id: keyframeId } = keyframeMetadata
  const { value, easing } = valueAnimation.keyframes[keyframeId]

  controls[keyframeId] = {
    ...getControlDefinition(valueName, value),
    onChange: (newValue: string) => updateKeyframe(keyframeMetadata, newValue),
  }

  if (typeof easing === "string" && easing.startsWith("steps")) {
    controls[`${keyframeId} easing freeform`] = {
      value: easing,
      label: "Easing",
      transient: true,
      onChange: (value: BezierDefinition) =>
        updateKeyframeEasing(keyframeMetadata, value),
    }
  } else {
    controls[`${keyframeId} easing`] = {
      ...bezier(Array.isArray(easing) ? [...easing] : (easing as any)),
      label: "Easing",
      transient: true,
      onChange: ([...points]: BezierDefinition) =>
        updateKeyframeEasing(keyframeMetadata, points),
    }
  }

  useControls(controls)

  return (
    <ActionsContainer>
      <DeleteButton onClick={() => deleteKeyframe(keyframeMetadata)}>
        <TrashIcon
          style={{
            width: 16,
            height: 16,
            color: "var(--red)",
            marginRight: 5,
          }}
        />
        Delete keyframe
      </DeleteButton>
    </ActionsContainer>
  )
}

export function KeyframeEditControls({ selectedKeyframes }: Props) {
  const selectedAnimation = useEditorState(getSelectedAnimation)

  if (!selectedAnimation) return null

  const controls = selectedKeyframes.map((keyframeMetadata) => {
    const { elementName, valueName, id } = keyframeMetadata
    const elementAnimation = selectedAnimation.elements[elementName]

    if (!elementAnimation) return null

    const valueAnimation = elementAnimation.find(
      (animation) => animation.valueName === valueName
    )

    return valueAnimation ? (
      <ValueControl
        key={id}
        valueAnimation={valueAnimation}
        keyframeMetadata={keyframeMetadata}
      />
    ) : null
  })

  return <>{controls}</>
}
