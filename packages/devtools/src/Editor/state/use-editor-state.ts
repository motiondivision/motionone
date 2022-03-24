import { EditorState } from "./types"
import { isEasingList } from "@motionone/utils"
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
  user: {
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
    get().stopPlaying()
    get().deselectKeyframes()
    set({ selectedAnimationName })
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
  /**
   * TODO: DRY updateKeyframe/KeyframeEasing
   */
  updateKeyframe: (keyframe, newValue) => {
    const { animations, selectedAnimationName } = get()
    const { elementName, valueName, index } = keyframe

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
  updateKeyframeEasing: (keyframe, newEasing) => {
    const { animations, selectedAnimationName } = get()
    const { valueId, elementName, index } = keyframe

    if (!selectedAnimationName) return

    set({
      animations: produce(animations, (draft) => {
        const valueIndex = draft[selectedAnimationName].elements[
          elementName
        ].findIndex((value) => value.id === valueId)

        if (
          isEasingList(
            draft[selectedAnimationName].elements[elementName][valueIndex]
              .options.easing
          )
        ) {
          draft[selectedAnimationName].elements[elementName][
            valueIndex
          ].options.easing![index - 1] = newEasing
        } else {
          console.log("setting easing to ", newEasing)
          draft[selectedAnimationName].elements[elementName][
            valueIndex
          ].options.easing = newEasing
        }
      }),
      selectedKeyframes: [{ ...keyframe }],
    })
  },
  logout: () => set({ user: { isPro: false } }),
  login: (user) => set({ user }),
}))
