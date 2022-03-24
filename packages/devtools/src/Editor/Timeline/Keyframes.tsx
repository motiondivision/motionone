import * as React from "react"
import { AnimationMetadata, ValueAnimationMetadata } from "../../types"
import { defaultOffset, fillOffset } from "@motionone/utils"
import styled from "styled-components"
import { motion } from "framer-motion"
import { EditorState, SelectedKeyframeMetadata } from "../state/types"
import { RepeatIcon } from "../icons/RepeatIcon"
import { useEditorState } from "../state/use-editor-state"

interface KeyframesProps {
  animation: AnimationMetadata
}

interface ValueKeyframesProps {
  scale: number
  animation: ValueAnimationMetadata
}

interface RepeatProps {
  scale: number
  time: number
  repeat: number
}

const ElementAnimationContainer = styled.ul`
  padding-top: var(--row-height);
  padding-left: 10px;

  &:first-child {
    padding-top: calc(var(--row-height) + 10px);
  }
`

const ValueAnimationContainer = styled.li`
  display: flex;
  position: relative;
  height: var(--row-height);
`

export const ValueMarker = styled(motion.div)`
  width: 16px;
  height: 16px;
  background-color: var(--white);
  position: absolute;
  top: 50%;
  left: 0;
  border-radius: 5px;
  border: 3px solid var(--black);
  z-index: 1;
  cursor: pointer;
`

const TransitionMarker = styled(motion.div)`
  position: absolute;
  top: calc(50% - 1px);
  left: 0;
  height: 2px;
  background-color: var(--feint);
  border-radius: 2px;
`

const RepeatContainer = styled.div`
  width: 200px;
  position: absolute;
  top: 0;
  bottom: 0;
`

const GradientMask = styled.div`
  background: linear-gradient(
    to left,
    var(--background),
    var(--background-transparent)
  );
  position: absolute;
  inset: 0;
`

const RepeatCount = styled.code`
  display: flex;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50px;
  transform: translateY(-50%);
  font-weight: bold;
  font-size: 12px;
  border-radius: 5px;
  padding: 2px 5px;
  background: var(--feint-solid);
  color: rgba(255, 255, 255, 0.4);

  svg {
    margin-right: 4px;
    fill: rgba(255, 255, 255, 0.4);
  }
`

const bufferTime = 1

function RepeatMarker({ scale, time, repeat }: RepeatProps) {
  return (
    <RepeatContainer style={{ transform: `translateX(${time * scale}px)` }}>
      <TransitionMarker style={{ width: "100%" }} />
      <GradientMask />
      <RepeatCount>
        <RepeatIcon style={{ width: 20, height: 20 }} />
        {repeat}
      </RepeatCount>
    </RepeatContainer>
  )
}

const getSelectedKeyframes = (state: EditorState) => state.selectedKeyframes
const getSelectKeyframe = (state: EditorState) => state.selectKeyframe

function ValueKeyframes({ scale, animation }: ValueKeyframesProps) {
  const selectKeyframe = useEditorState(getSelectKeyframe)
  const selectedKeyframes = useEditorState(getSelectedKeyframes)

  const { id, elementId, valueName, keyframes, options } = animation
  let { delay = 0, duration = 0.3, offset, repeat } = options

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
      selectedKeyframes,
      elementId,
      valueName,
      i
    )

    markers.push(
      <>
        {prevTime !== undefined ? (
          <TransitionMarker
            initial={false}
            animate={{
              backgroundColor: keyframeIsSelected
                ? "var(--strong-blue)"
                : "var(--feint)",
            }}
            transition={{ duration: 0.1 }}
            style={{
              width: (time - prevTime) * scale,
              transform: `translateX(${(prevTime ?? 0) * scale}px)`,
            }}
          />
        ) : null}
        <ValueMarker
          onClick={(e) => {
            e.stopPropagation()
            selectKeyframe({
              elementName: elementId,
              valueName,
              valueId: id,
              index: i,
            })
          }}
          initial={false}
          animate={{
            backgroundColor: keyframeIsSelected
              ? "var(--strong-blue)"
              : "var(--white)",
          }}
          transition={{ duration: 0.1 }}
          style={{
            transform: `translateY(-50%) translateX(${
              time * scale
            }px) rotate(45deg)`,
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
      {repeat ? (
        <RepeatMarker repeat={repeat} time={prevTime || 0} scale={scale} />
      ) : null}
    </ValueAnimationContainer>
  )
}

const getTimeScale = (state: EditorState) => state.scale

export function Keyframes({ animation }: KeyframesProps) {
  const { elements } = animation
  const elementAnimations: any[] = []

  const scale = useEditorState(getTimeScale)

  for (const elementName in elements) {
    const valueAnimations: any[] = []

    for (const valueAnimation of elements[elementName]) {
      valueAnimations.push(
        <ValueKeyframes
          key={valueAnimation.valueName}
          scale={scale}
          animation={valueAnimation}
        />
      )
    }

    elementAnimations.push(
      <ElementAnimationContainer key={elementName}>
        {valueAnimations}
      </ElementAnimationContainer>
    )
  }

  return <div>{elementAnimations}</div>
}

function isKeyframeSelected(
  selectedKeyframes: SelectedKeyframeMetadata[] | undefined,
  elementName: string,
  valueName: string,
  keyframeIndex: number
): boolean {
  if (!selectedKeyframes) return false

  return selectedKeyframes.some(
    (keyframe) =>
      keyframe.elementName === elementName &&
      keyframe.valueName === valueName &&
      keyframe.index === keyframeIndex
  )
}
