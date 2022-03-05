import * as React from "react"
import { AnimationMetadata, ValueAnimationMetadata } from "../../types"
import { defaultOffset, fillOffset } from "@motionone/utils"
import styled from "styled-components"
import { EditorState, EditorStateWithActions } from "../state/types"

interface KeyframesProps {
  scale: number
  animation: AnimationMetadata
  state: EditorStateWithActions
}

interface ValueKeyframesProps {
  scale: number
  animation: ValueAnimationMetadata
  state: EditorStateWithActions
}

const ElementAnimationContainer = styled.ul`
  padding-top: calc(var(--row-height) + 10px);
  padding-left: 10px;
`

const ValueAnimationContainer = styled.li`
  display: flex;
  position: relative;
  height: var(--row-height);
`

const ValueMarker = styled.div`
  width: 10px;
  height: 10px;
  background: var(--white);
  position: absolute;
  top: 50%;
  left: 0;
  border-radius: 5px;
  border: 3px solid var(--black);
  z-index: 1;
  cursor: pointer;
`

const TransitionMarker = styled.div`
  position: absolute;
  top: calc(50% - 1px);
  left: 0;
  height: 2px;
  background: var(--feint);
  border-radius: 2px;
`

const bufferTime = 1

function ValueKeyframes({ scale, animation, state }: ValueKeyframesProps) {
  const { elementId, valueName, keyframes, options } = animation
  let { delay = 0, duration = 0.3, easing, repeat, offset } = options

  const numKeyframes = keyframes.length
  offset ??= defaultOffset(numKeyframes)
  const remainder = numKeyframes - offset.length
  remainder > 0 && fillOffset(offset, remainder)

  const markers: any[] = []

  let prevTime: number | undefined
  for (let i = 0; i < numKeyframes; i++) {
    // const value = keyframes[i]
    const valueOffset = offset[i]
    const time = delay + valueOffset * duration
    const keyframeIsSelected = isKeyframeSelected(
      state,
      elementId,
      valueName,
      i
    )

    markers.push(
      <>
        {prevTime !== undefined ? (
          <TransitionMarker
            style={{
              width: (time - prevTime) * scale,
              transform: `translateX(${(prevTime ?? 0) * scale}px)`,
              background: keyframeIsSelected
                ? "var(--strong-blue)"
                : "var(--feint)",
            }}
          />
        ) : null}
        <ValueMarker
          onClick={() =>
            state.selectKeyframe({
              elementName: elementId,
              valueName,
              index: i,
            })
          }
          style={{
            transform: `translateY(-50%) translateX(${
              time * scale
            }px) rotate(45deg)`,
            background: keyframeIsSelected
              ? "var(--strong-blue)"
              : "var(--white)",
          }}
        />
      </>
    )

    prevTime = time
  }

  return (
    <ValueAnimationContainer
      style={{ width: (delay + duration + bufferTime) * scale }}
    >
      {markers}
    </ValueAnimationContainer>
  )
}

export function Keyframes({ scale, animation, state }: KeyframesProps) {
  const elementAnimations: any[] = []

  for (const elementName in animation) {
    const valueAnimations: any[] = []

    for (const valueAnimation of animation[elementName]) {
      valueAnimations.push(
        <ValueKeyframes
          key={valueAnimation.valueName}
          scale={scale}
          animation={valueAnimation}
          state={state}
        />
      )
    }

    elementAnimations.push(
      <ElementAnimationContainer key={elementName}>
        {valueAnimations}
      </ElementAnimationContainer>
    )
  }

  return <>{elementAnimations}</>
}

function isKeyframeSelected(
  state: EditorState,
  elementName: string,
  valueName: string,
  keyframeIndex: number
): boolean {
  if (!state.selectedKeyframes) return false

  return state.selectedKeyframes.some(
    (keyframe) =>
      keyframe.elementName === elementName &&
      keyframe.valueName === valueName &&
      keyframe.index === keyframeIndex
  )
}
