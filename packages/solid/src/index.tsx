import { JSX } from "solid-js"
import { MotionBaseComponent, MotionProxy, MotionComponent } from "./types"
import { Motion } from "./component"

const MotionBase: MotionBaseComponent = (props) => (
  <Motion tag="div" {...props} />
)

const components = new Map<string, MotionComponent<any>>()

const motionProxy = new Proxy(MotionBase, {
  get: (_, tag: keyof JSX.IntrinsicElements) => {
    tag = tag.toLowerCase() as keyof JSX.IntrinsicElements
    let component = components.get(tag)
    if (!component) {
      component = (props) => <Motion {...props} tag={tag} />
      components.set(tag, component)
    }
    return component
  },
}) as MotionProxy

export { motionProxy as Motion }
