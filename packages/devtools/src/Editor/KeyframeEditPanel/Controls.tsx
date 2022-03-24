import { bezier } from "@leva-ui/plugin-bezier"
import { BezierDefinition, Easing, EasingGenerator } from "@motionone/types"
import { isEasingGenerator, isEasingList } from "@motionone/utils"
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
  const updateKeyframe = useEditorState(getUpdateKeyframe)
  const updateKeyframeEasing = useEditorState(getUpdateKeyframeEasing)
  const { valueId, valueName, index } = keyframeMetadata
  const { keyframes, options } = valueAnimation
  const { easing } = options
  const keyframeEasing = getKeyframeEasing(easing, index)

  // TODO Replace with uuid
  const keyframeKey = `${valueId} [${index}]`

  const controls = {
    [keyframeKey]: {
      ...getControlDefinition(valueName, keyframes[index] as string),
      onChange: (newValue: string) =>
        updateKeyframe(keyframeMetadata, newValue),
    },
  }

  if (keyframeEasing) {
    if (
      typeof keyframeEasing === "string" &&
      keyframeEasing.startsWith("steps")
    ) {
      controls[`${keyframeKey} easing freeform`] = {
        value: keyframeEasing,
        label: "Easing",
        transient: true,
        onChange: (value: BezierDefinition) =>
          updateKeyframeEasing(keyframeMetadata, value),
      }
    } else {
      controls[`${keyframeKey} easing`] = {
        ...bezier(keyframeEasing as any),
        label: "Easing",
        transient: true,
        onChange: ([...points]: BezierDefinition) =>
          updateKeyframeEasing(keyframeMetadata, points),
      }
    }
  }

  useControls(controls)

  return null
}

export function KeyframeEditControls({ selectedKeyframes }: Props) {
  const selectedAnimation = useEditorState(getSelectedAnimation)

  if (!selectedAnimation) return null

  const controls = selectedKeyframes.map((keyframeMetadata) => {
    const { elementName, valueName, index } = keyframeMetadata
    const elementAnimation = selectedAnimation.elements[elementName]

    if (!elementAnimation) return null

    const valueAnimation = elementAnimation.find(
      (animation) => animation.valueName === valueName
    )

    return valueAnimation ? (
      <ValueControl
        key={elementName + valueName + index}
        valueAnimation={valueAnimation}
        keyframeMetadata={keyframeMetadata}
      />
    ) : null
  })

  return <>{controls}</>
}

function getKeyframeEasing(
  easing: EasingGenerator | Easing | Easing[] | undefined,
  index: number
) {
  /**
   * Don't display easing for first keyframe or accept easing generator
   * TODO: Remove this check as to support easing generators we'll be receiving this as a
   * serialised object of some kind.
   */
  if (!easing || !index || isEasingGenerator(easing)) return

  const easingDefinition = isEasingList(easing) ? easing[index - 1] : easing

  /**
   * Leva is mutatative of the initial value, so if this is a bezier definition, copy.
   */
  return Array.isArray(easingDefinition)
    ? [...easingDefinition]
    : easingDefinition
}
