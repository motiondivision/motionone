import { Options } from "../types"

export interface StateHandlers {
  enable: VoidFunction
  disable: VoidFunction
}

export interface Gesture {
  isActive: (options: Options) => boolean
  subscribe: (
    element: Element,
    stateHandlers: StateHandlers,
    options: Options
  ) => () => void
}
