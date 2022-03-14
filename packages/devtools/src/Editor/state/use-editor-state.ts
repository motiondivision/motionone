import { EditorState } from "./types"
import create from "zustand"
import produce from "immer"
import { getCurrentTime } from "./selectors"

export const useEditorState = create<EditorState>((set, get) => ({
  /**
   * State
   */
  animations: {},
  isRecording: false,
  hasRecorded: false,
  auth: {
    isPro: false,
  },
  scale: 320,
  playbackOrigin: undefined,

  /**
   * Methods
   */
  clear: () => {
    set({
      selectedAnimationName: undefined,
      animations: {},
      selectedKeyframes: undefined,
    })
    get().stopPlaying()
  },
  startRecording: () => {
    set({ isRecording: true, hasRecorded: true })
    get().clear()
  },
  stopRecording: () => set({ isRecording: false }),
  selectKeyframe: (keyframe) => set({ selectedKeyframes: [{ ...keyframe }] }),
  deselectKeyframes: () => set({ selectedKeyframes: undefined }),
  selectAnimation: (selectedAnimationName) => {
    set({ selectedAnimationName })
    get().stopPlaying()
    get().deselectKeyframes()
  },
  scrubTo: (time) => {
    const { animations, selectedAnimationName } = get()

    if (selectedAnimationName && animations[selectedAnimationName]) {
      set({
        isRecording: false,
        animations: produce(animations, (draft) => {
          draft[selectedAnimationName].currentTime = time
        }),
      })
    }
  },
  addAnimations: (animations) => {
    get().stopPlaying()
    set({
      selectedAnimationName:
        get().selectedAnimationName ?? Object.keys(animations)[0],
      animations: {
        ...get().animations,
        ...animations,
      },
    })
  },
  setScale: (scale) => set({ scale }),
  startPlaying: () => {
    const currentTime = getCurrentTime(get())

    if (currentTime !== undefined) {
      set({
        isRecording: false,
        playbackOrigin: {
          startedAt: performance.now(),
          originTime: currentTime * 1000,
        },
      })
    }
  },
  stopPlaying: () => set({ playbackOrigin: undefined }),
  updateKeyframe: (keyframe, newValue) => {
    const { animations, selectedAnimationName } = get()
    const { elementName, valueName, index } = keyframe
    console.log(selectedAnimationName, newValue)
    if (!selectedAnimationName) return

    set({
      animations: produce(animations, (draft) => {
        const valueIndex = draft[selectedAnimationName].elements[
          elementName
        ].findIndex((value) => value.valueName === valueName)
        draft[selectedAnimationName].elements[elementName][
          valueIndex
        ].keyframes[index] = newValue
      }),
      selectedKeyframes: [{ ...keyframe }],
    })
  },
}))
