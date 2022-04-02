import {
  on,
  Component,
  Accessor,
  createSignal,
  createComputed,
  Index,
  onMount,
  JSX,
  onCleanup,
} from "solid-js"
import { mountedStates, MotionState } from "@motionone/dom"

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
  const [els, setEls] = createSignal<Element[]>([])
  const doneCallbacks = new WeakMap<Element, VoidFunction>()
  const removeDoneCallback = (el: Element) => {
    const prevDoneCallback = doneCallbacks.get(el)
    if (prevDoneCallback) {
      el.removeEventListener("motioncomplete", prevDoneCallback)
    }
    doneCallbacks.delete(el)
  }
  createComputed(
    on(
      () => props.when() === true,
      () => {
        if (!!props.when()) {
          setEls(resolveChildren(props.children))
        }
      }
    )
  )
  const Element: Component<{
    index: number
    el: Element
    when: Accessor<boolean>
  }> = (props) => {
    let state: MotionState | undefined
    onMount(() => {
      state = mountedStates.get(props.el)
      removeDoneCallback(props.el)
      state!.setActive("exit", false)
      createComputed(
        on(props.when, () => {
          if (!props.when()) {
            const done = () => {
              setEls((els) => {
                const newEls = [...els]
                newEls.splice(props.index, 1)
                return newEls
              })
            }
            doneCallbacks.set(props.el, done)
            props.el.addEventListener("motioncomplete", done)
            state!.setActive("exit", true)
            onCleanup(() =>
              props.el.removeEventListener("motioncomplete", done)
            )
          }
        })
      )
    })
    return props.el
  }
  return (
    <Index each={els()}>
      {(el, index) => <Element index={index} when={props.when} el={el()} />}
    </Index>
  )
}
