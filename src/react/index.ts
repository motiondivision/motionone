import type { AnimatedDOMComponents } from "./types"
import { createAnimatedComponent } from "./animated"

const components = new Map<string, any>()
export const animated = new Proxy(
  {},
  {
    get: (_, key: string) => {
      if (!components.has(key)) {
        components.set(key, createAnimatedComponent(key))
      }

      return components.get(key)!
    },
  }
) as AnimatedDOMComponents
