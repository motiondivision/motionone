import * as React from "react"

interface AnimatedProps {}

function createAnimatedComponent(Component: string) {
  function Animated(props: AnimatedProps, ref: React.Ref<Element>) {
    return null
  }

  return React.forwardRef(Animated)
}

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
)
