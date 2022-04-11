import {
  Component,
  createSignal,
  children,
  createComputed,
  untrack,
  onMount,
  on,
  createMemo,
  onCleanup,
} from "solid-js"
import { mountedStates } from "@motionone/dom"
import { PresenceContext } from "./context"
import { ResolvedChildren } from "solid-js/types/reactive/signal"

const getSingleElement = (resolved: ResolvedChildren): Element | undefined => {
  resolved = Array.isArray(resolved) ? resolved[0] : resolved
  return resolved instanceof Element ? resolved : undefined
}

const addCompleteListener = (el: Element, fn: VoidFunction): VoidFunction => {
  el.addEventListener("motioncomplete", fn)
  return () => el.removeEventListener("motioncomplete", fn)
}

export const Presence: Component<{ initial?: boolean }> = (props) => {
  let { initial = true } = props
  onMount(() => (initial = true))

  let exitting: boolean = false
  let listener: VoidFunction | undefined
  let complete: VoidFunction | undefined

  let unmounts: VoidFunction[] = []
  let mounts: VoidFunction[] = []

  const unmountAll = () => {
    unmounts.forEach((f) => f())
    unmounts = []
  }
  const mountAll = () => {
    mounts.forEach((f) => f())
    mounts = []
  }

  onCleanup(() => {
    unmountAll()
    listener?.()
    mounts = []
    listener = undefined
    complete = undefined
  })

  return (
    <PresenceContext.Provider
      value={{
        cleanup: (fn) => unmounts.push(fn),
        mount: (fn) => mounts.push(fn),
        initial: () => initial,
      }}
    >
      {untrack(() => {
        const resolved = children(() => props.children)
        const resolvedChild = createMemo(() => getSingleElement(resolved()))
        const [el, setEl] = createSignal<Element>()

        const enterTransition = (el: Element) => {
          setEl(el)
          mountAll()
        }

        const exitTransition = (
          el: Element | undefined,
          done: VoidFunction
        ) => {
          complete = () => {
            complete = undefined
            unmountAll()
            done()
          }

          if (!el) return complete()
          const state = mountedStates.get(el)
          if (!state) return complete()

          state.setActive("exit", true)
          exitting = true
          listener = addCompleteListener(el, () => {
            exitting = false
            complete?.()
          })
        }

        createComputed(
          on(resolvedChild, (newEl) => {
            complete?.(), listener?.(), (listener = undefined)
            const prevEl = el()

            // exit
            if (!newEl) exitTransition(prevEl, setEl)
            // exit -> enter
            else if (prevEl)
              exitTransition(prevEl, () => !exitting && enterTransition(newEl))
            // enter
            else enterTransition(newEl)
          })
        )

        return el
      })}
    </PresenceContext.Provider>
  )
}
