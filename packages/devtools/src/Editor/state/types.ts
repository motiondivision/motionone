import { Easing } from "@motionone/types"
import type { AnimationsMetadata, EditorAuth } from "../../types"

export enum Actions {
  Clear,
  Add,
  StartRecording,
  StopRecording,
  SelectAnimation,
  SelectKeyframe,
  DeselectKeyframe,
  Scrub,
}

export interface SelectedKeyframeMetadata {
  elementName: string
  valueId: string
  valueName: string
  id: string
}

export interface PlaybackOrigin {
  startedAt: number
  originTime: number
}

export interface EditorState {
  user: EditorAuth
  animations: AnimationsMetadata
  playbackOrigin: PlaybackOrigin | undefined
  isRecording: boolean
  hasRecorded: boolean
  selectedAnimationName?: string
  selectedKeyframes?: SelectedKeyframeMetadata[]
  scale: number
  addAnimations(animations: AnimationsMetadata): void
  clear(): void
  startRecording(): void
  stopRecording(): void
  selectAnimation(name: string): void
  selectKeyframe(keyframe: SelectedKeyframeMetadata): void
  deselectKeyframes(): void
  scrubTo(time: number): void
  setScale(time: number): void
  startPlaying(): void
  stopPlaying(): void
  updateKeyframe(keyframe: SelectedKeyframeMetadata, newValue: string): void
  updateKeyframeEasing(
    keyframe: SelectedKeyframeMetadata,
    newEasing: Easing
  ): void
  logout(): void
  login(user: EditorAuth): void
}
