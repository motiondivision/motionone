import type { MotionDOMComponents } from "./types"
import { createMotionComponent } from "./component"

const components = new Map<string, any>()
export const motion = new Proxy(
  {},
  {
    get: (_, key: string) => {
      !components.has(key) && components.set(key, createMotionComponent(key))

      return components.get(key)!
    },
  }
) as MotionDOMComponents
