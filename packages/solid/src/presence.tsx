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

  const runComplete = () => {
    complete?.()
    complete = undefined
  }

  const unmounts = new Set<VoidFunction>()
  const mounts = new Set<VoidFunction>()

  const unmountAll = () => {
    unmounts.forEach((f) => f())
    unmounts.clear()
  }
  const mountAll = () => {
    mounts.forEach((f) => f())
    mounts.clear()
  }

  onCleanup(() => {
    unmountAll()
    mounts.clear()
    listener?.()
    listener = undefined
    complete = undefined
  })

  return (
    <PresenceContext.Provider
      value={{
        cleanup: (fn) => unmounts.add(fn),
        mount: (fn) => mounts.add(fn),
        initial: () => initial,
      }}
    >
      {untrack(() => {
        const resolved = children(() => props.children)
        const resolvedChild = createMemo(() => getSingleElement(resolved()))
        const [el, setEl] = createSignal<Element>()

        createComputed(
          on(resolvedChild, (newEl) => {
            runComplete(), listener?.(), (listener = undefined)
            const prevEl = el()

            // exit
            if (!newEl) {
              complete = () => (setEl(), unmountAll())

              if (!prevEl) return runComplete()
              const state = mountedStates.get(prevEl)
              if (!state) return runComplete()

              state.setActive("exit", true)
              listener = addCompleteListener(prevEl, runComplete)
            }

            // exit -> enter
            else if (prevEl) {
              complete = () => {
                unmountAll()
                if (exitting) return
                setEl(newEl)
                mountAll()
              }

              const state = mountedStates.get(prevEl)
              if (!state) runComplete()
              else {
                state.setActive("exit", true)
                exitting = true
                listener = addCompleteListener(prevEl, () => {
                  exitting = false
                  runComplete()
                })
              }
            }

            // enter
            else {
              setEl(newEl)
              mountAll()
            }
          })
        )

        return el
      })}
    </PresenceContext.Provider>
  )
}
