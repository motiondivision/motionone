import { MotionProxy, MotionProxyComponent } from "./types"
import { Motion } from "./component"

const components = new Map<string, MotionProxyComponent<any>>()

const motionProxy = new Proxy(Motion, {
  get: (_, tag: string) => {
    tag = tag.toLowerCase()
    let component = components.get(tag)
    if (!component) {
      component = (props) => {
        delete props.tag
        return <Motion {...props} tag={tag} />
      }
      components.set(tag, component)
    }
    return component
  },
}) as MotionProxy

export { motionProxy as Motion }
