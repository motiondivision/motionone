import { createMotionState } from ".."
import { style } from "../../animate/style"
import { createStyles } from "../../animate/utils/style-object"
import { MotionState, Options } from "../types"

export function createTestMotionState(options: Options, parent?: MotionState) {
  const element = document.createElement("div")

  const state = createMotionState(options, parent)

  state.mount(element)

  const initialStyles = createStyles(state.getTarget())
  for (const key in initialStyles) {
    style.set(element, key, initialStyles[key])
  }

  state.update(options)

  return { element, state }
}
