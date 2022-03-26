import { EditorState, SelectedKeyframeMetadata } from "./types"
import create, { GetState, SetState, StateCreator } from "zustand"
import produce from "immer"
import { getCurrentTime } from "./selectors"
import { sortKeyframesByOffset } from "../../utils/sort-keyframes"
import { defaults } from "@motionone/utils"

const makeKeyframeUpdater =
  (get: GetState<EditorState>, set: SetState<EditorState>, key: string) =>
  (keyframe: SelectedKeyframeMetadata, newValue: any) => {
    const { animations, selectedAnimationName } = get()
    const { elementName, valueId, id } = keyframe

    if (!selectedAnimationName) return

    set({
      animations: produce(animations, (draft) => {
        const elementValues = draft[selectedAnimationName].elements[elementName]

        const valueIndex = elementValues.findIndex(
          (value) => value.id === valueId
        )

        const keyframe = elementValues[valueIndex].keyframes[id]

        elementValues[valueIndex].keyframes[id] = {
          ...keyframe,
          [key]: newValue,
        }
      }),
      selectedKeyframes: [{ ...keyframe }],
    })
  }

export const stateFactory: StateCreator<EditorState> = (set, get) => ({
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
  updateKeyframe: makeKeyframeUpdater(get, set, "value"),
  updateKeyframeEasing: makeKeyframeUpdater(get, set, "easing"),
  deleteKeyframe: ({ elementName, valueId, id }) => {
    const { animations, selectedAnimationName } = get()
    if (!selectedAnimationName) return

    set({
      animations: produce(animations, (draft) => {
        const elementValues = draft[selectedAnimationName].elements[elementName]
        const valueAnimation = elementValues.find(
          (value) => value.id === valueId
        )

        if (!valueAnimation) return

        const orderedKeyframes = sortKeyframesByOffset(valueAnimation.keyframes)
        const { delay = 0, duration = defaults.duration } =
          valueAnimation.options

        const timestampedKeyframes = orderedKeyframes
          .map((keyframe) => ({
            ...keyframe,
            time: delay + duration * keyframe.offset,
          }))
          .filter((keyframe) => keyframe.id !== id)

        const firstKeyframeTime = timestampedKeyframes[0].time
        const lastKeyframeTime =
          timestampedKeyframes[timestampedKeyframes.length - 1].time

        const newDelay = firstKeyframeTime
        const newDuration = lastKeyframeTime - firstKeyframeTime
        valueAnimation.options.delay = newDelay
        valueAnimation.options.duration = newDuration

        for (const { time, ...keyframe } of timestampedKeyframes) {
          valueAnimation.keyframes[keyframe.id] = {
            ...keyframe,
            offset: (time - newDelay) / newDuration,
          }
        }

        delete valueAnimation.keyframes[id]
      }),
      selectedKeyframes: undefined,
    })
  },
  logout: () => set({ user: { isPro: false } }),
  login: (user) => set({ user }),
})

export const useEditorState = create<EditorState>(stateFactory)
