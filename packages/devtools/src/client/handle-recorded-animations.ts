import { AnimationStartMessage } from "../types"
import { store } from "./state"

export function handleRecordedAnimations() {
  let scheduledFlush: number | undefined = undefined

  function flushAnimations() {
    scheduledFlush = undefined

    const { recordedAnimations, flushRecordedAnimations } = store.getState()

    if (!recordedAnimations) return

    const message: AnimationStartMessage = {
      type: "animationstart",
      animations: recordedAnimations,
    }

    window.postMessage(message, "*")

    flushRecordedAnimations()
  }

  /**
   * Handle newly recorded animations
   */
  store.subscribe(
    (recordedAnimations) => {
      if (!recordedAnimations) return

      if (scheduledFlush === undefined) {
        scheduledFlush = requestAnimationFrame(flushAnimations)
      }
    },
    (state) => state.recordedAnimations
  )

  // /**
  //  * Handle Greensock animations
  //  */
  // const recordedGreensockAnimations = new Set()

  // function recordNewTimelineAnimations(timeline: any) {
  //   const { recordAnimation } = store.getState()
  //   const children = timeline.getChildren()
  //   for (const child of children) {
  //     // TODO: This is a timeline
  //     if (child.labels) continue

  //     if (recordedGreensockAnimations.has(child)) continue
  //     recordedGreensockAnimations.add(child)

  //     const propTweenData = child._pt

  //     const values = child._ptLookup
  //     const targets = child._targets

  //     if (!values) continue

  //     console.log(values, propTweenData)

  //     // for (const valueName in values) {
  //     //   const propTween = values[valueName]
  //     //   recordAnimation(element, valueName, [propTween.s, propTween.t], {})
  //     // }
  //   }
  // }

  // function recordGreensockAnimations() {
  //   const { gsap, recordAnimation } = store.getState()

  //   recordNewTimelineAnimations(gsap.globalTimeline)
  // }

  // store.subscribe(
  //   ({ gsap, isRecording }) => {
  //     if (gsap && isRecording) {
  //       sync.update(recordGreensockAnimations, true)
  //     } else {
  //       cancelSync.update(recordGreensockAnimations)
  //       recordedGreensockAnimations.clear()
  //     }
  //   },
  //   ({ gsap, isRecording }) => ({ gsap, isRecording })
  // )
}
