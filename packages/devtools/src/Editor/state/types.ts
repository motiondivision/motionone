import type { AnimationsMetadata, EditorAuth } from "../../types"

export enum Actions {
  Clear,
  Add,
  StartRecording,
  StopRecording,
  SelectAnimation,
  SelectKeyframe,
  DeselectKeyframe,
}

export interface SelectedKeyframeMetadata {
  elementName: string
  valueName: string
  index: number
}

export interface EditorState {
  auth: EditorAuth
  animations: AnimationsMetadata
  isRecording: boolean
  hasRecorded: boolean
  selected?: string
  selectedKeyframes?: SelectedKeyframeMetadata[]
}

export interface EditorStateWithActions extends EditorState {
  clear(): void
  startRecording(): void
  stopRecording(): void
  selectAnimation(name: string): void
  selectKeyframe(keyframe: SelectedKeyframeMetadata): void
}

export type EditorAction =
  | { type: Actions.Clear }
  | { type: Actions.Add; animations: AnimationsMetadata }
  | { type: Actions.StartRecording }
  | { type: Actions.StopRecording }
  | { type: Actions.SelectAnimation; name: string }
  | { type: Actions.SelectKeyframe; keyframe: SelectedKeyframeMetadata }
  | { type: Actions.DeselectKeyframe }
