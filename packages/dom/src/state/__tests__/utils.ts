import { createMotionState } from ".."
import { cssVariableRenderer, styleRenderer } from "../../animate/utils/apply"
import { isCssVar } from "../../animate/utils/css-var"
import { createStyles } from "../../animate/utils/style-object"
import { MotionState, Options } from "../types"

export function createTestMotionState(options: Options, parent?: MotionState) {
  const element = document.createElement("div")

  const state = createMotionState(options, parent)

  state.mount(element)

  const initialStyles = createStyles(state.getTarget())
  for (const key in initialStyles) {
    if (isCssVar(key)) {
      cssVariableRenderer(element, key)(initialStyles[key])
    } else {
      styleRenderer(element, key)(initialStyles[key])
    }
  }

  state.update(options)

  return { element, state }
}
