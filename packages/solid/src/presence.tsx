import {
  on,
  Component,
  Accessor,
  createSignal,
  createEffect,
  JSX,
} from "solid-js"
import { mountedStates } from "@motionone/dom"

type PresenceProps = {
  when: Accessor<boolean>
}

const resolveChildren = (resolved: JSX.Element | Function): Element[] | [] => {
  if (typeof resolved === "function") {
    return [resolved()]
  } else if (typeof resolved === "object") {
    return (Array.isArray(resolved) ? resolved : [resolved]).filter(
      (el) => el instanceof Element
    ) as Element[]
  }
  return []
}

export const Presence: Component<PresenceProps> = (props) => {
  let mounting = true
  const [els, setEls] = createSignal<Element[]>([])
  const doneCallbacks = new WeakMap<Element, VoidFunction>()
  const resolve = () => {
    const els = resolveChildren(props.children)
    setEls(els)
    return els
  }
  const removeDoneCallback = (el: Element) => {
    const prevDoneCallback = doneCallbacks.get(el)
    if (prevDoneCallback) {
      el.removeEventListener("motioncomplete", prevDoneCallback)
    }
    doneCallbacks.delete(el)
  }
  const enter = (el: Element) => {
    const state = mountedStates.get(el)
    if (!state) return
    removeDoneCallback(el)
    state.setActive("exit", false)
  }
  const exit = (el: Element, done: VoidFunction) => {
    const state = mountedStates.get(el)
    if (!state) return done()
    removeDoneCallback(el)
    doneCallbacks.set(el, done)
    state.setActive("exit", true)
    el.addEventListener("motioncomplete", done)
  }
  // TODO: Clean-up the effect and ask about not using the microtask.
  createEffect(
    on(
      () => props.when(),
      () => {
        if (mounting === true) {
          mounting = false
          return
        }
        const els = resolve()
        queueMicrotask(() => {
          for (let i in els) {
            if (!!props.when()) {
              enter(els[i])
            } else if (!props.when()) {
              exit(els[i], () => setEls([]))
            }
          }
        })
      }
    )
  )
  return <>{els()}</>
}
