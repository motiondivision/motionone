import { Reducer } from "react"
import { Actions, EditorAction, EditorState } from "./types"

export const reducer: Reducer<EditorState, EditorAction> = (state, action) => {
  switch (action.type) {
    case Actions.Add: {
      let firstAnimationName: string | undefined

      const newAnimations = { ...state.animations }

      for (const animationName in action.animations) {
        const animation = action.animations[animationName]

        if (!firstAnimationName) firstAnimationName = animationName

        if (!newAnimations[animationName]) {
          newAnimations[animationName] = animation
        } else {
          // Copy into existing animation
        }
      }

      return {
        ...state,
        animations: newAnimations,
        selected: state.selected ?? firstAnimationName,
      }
    }
    case Actions.Clear: {
      return {
        ...state,
        animations: {},
        selected: undefined,
      }
    }
    case Actions.StartRecording: {
      return reducer(
        {
          ...state,
          isRecording: true,
          hasRecorded: true,
        },
        { type: Actions.Clear }
      )
    }
    case Actions.StopRecording: {
      return {
        ...state,
        isRecording: false,
      }
    }
    case Actions.SelectAnimation: {
      return { ...state, selected: action.name }
    }
    case Actions.SelectKeyframe: {
      return {
        ...state,
        selectedKeyframes: [action.keyframe],
      }
    }
    case Actions.DeselectKeyframe: {
      return {
        ...state,
        selectedKeyframes: undefined,
      }
    }
  }
}
