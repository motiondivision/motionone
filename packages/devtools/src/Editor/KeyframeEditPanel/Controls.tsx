import { bezier } from "@leva-ui/plugin-bezier"
import { BezierDefinition } from "@motionone/types"
import { useControls } from "leva"
import * as React from "react"
import { ValueAnimationMetadata } from "../../types"
import {
  getSelectedAnimation,
  getUpdateKeyframe,
  getUpdateKeyframeEasing,
} from "../state/selectors"
import { SelectedKeyframeMetadata } from "../state/types"
import { useEditorState } from "../state/use-editor-state"
import { getControlDefinition } from "./definitions"

interface Props {
  selectedKeyframes: SelectedKeyframeMetadata[]
}

interface ValueControlProps {
  valueAnimation: ValueAnimationMetadata
  keyframeMetadata: SelectedKeyframeMetadata
}

function ValueControl({ keyframeMetadata, valueAnimation }: ValueControlProps) {
  const controls = {}
  const updateKeyframe = useEditorState(getUpdateKeyframe)
  const updateKeyframeEasing = useEditorState(getUpdateKeyframeEasing)
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
      ...bezier(easing as any),
      label: "Easing",
      transient: true,
      onChange: ([...points]: BezierDefinition) =>
        updateKeyframeEasing(keyframeMetadata, points),
    }
  }

  useControls(controls)

  return null
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
