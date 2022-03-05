import { useReducer } from "react"
import { reducer } from "./reducer"
import { Actions, EditorStateWithActions } from "./types"
import { useIncomingMessages } from "./use-incoming-messages"
import { useIsRecording } from "./use-is-recording"

export function useEditorState(
  port?: chrome.runtime.Port
): EditorStateWithActions {
  const [state, dispatch] = useReducer(reducer, {
    animations: {},
    isRecording: false,
    hasRecorded: false,
  })

  useIsRecording(state, port)
  useIncomingMessages(dispatch, port)

  return {
    ...state,
    clear: () => dispatch({ type: Actions.Clear }),
    startRecording: () => dispatch({ type: Actions.StartRecording }),
    stopRecording: () => dispatch({ type: Actions.StopRecording }),
    selectAnimation: (name) =>
      dispatch({ type: Actions.SelectAnimation, name }),
    selectKeyframe: (keyframe) =>
      dispatch({ type: Actions.SelectKeyframe, keyframe }),
  }
}
