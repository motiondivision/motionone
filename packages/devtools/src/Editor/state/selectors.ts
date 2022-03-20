import { EditorState } from "./types"

export const getSelectedAnimationName = (state: EditorState) =>
  state.selectedAnimationName

export const getSelectedAnimation = (state: EditorState) => {
  const name = getSelectedAnimationName(state)
  if (name) return state.animations[name]
}

export const getPlayback = (state: EditorState) => {
  return {
    playbackOrigin: state.playbackOrigin,
    startPlaying: state.startPlaying,
    stopPlaying: state.stopPlaying,
    scrubTo: state.scrubTo,
  }
}

export const getCurrentTime = (state: EditorState) => {
  const selectedAnimation = getSelectedAnimation(state)
  return selectedAnimation?.currentTime
}

export const getUpdateKeyframe = (state: EditorState) => {
  return state.updateKeyframe
}

export const getUpdateKeyframeEasing = (state: EditorState) => {
  return state.updateKeyframeEasing
}
