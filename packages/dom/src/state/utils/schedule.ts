import { addUniqueItem, removeItem } from "../../utils/array"
import { MotionState } from "../types"

let scheduled: MotionState[] | undefined = undefined

function processScheduledAnimations() {
  if (!scheduled) return

  const generators = scheduled.sort(compareByDepth).map(fireAnimateUpdates)

  generators.forEach(fireNext)
  generators.forEach(fireNext)

  scheduled = undefined
}

export function scheduleAnimation(state: MotionState) {
  if (!scheduled) {
    scheduled = [state]
    requestAnimationFrame(processScheduledAnimations)
  } else {
    addUniqueItem(scheduled, state)
  }
}

export function unscheduleAnimation(state: MotionState) {
  scheduled && removeItem(scheduled, state)
}

const compareByDepth = (a: MotionState, b: MotionState) =>
  a.getDepth() - b.getDepth()

const fireAnimateUpdates = (state: MotionState) => state.animateUpdates()

const fireNext = (iterator: Iterator<void>) => iterator.next()
