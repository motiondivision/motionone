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
import { mountedStates, MotionState } from "@motionone/dom"
import { UnmountContext, OngoingStateContext } from "./context"
import { ResolvedChildren } from "solid-js/types/reactive/signal"

const getSingleElement = (resolved: ResolvedChildren): Element | undefined => {
  resolved = Array.isArray(resolved) ? resolved[0] : resolved
  return resolved instanceof Element ? resolved : undefined
}

const elIdArray: Element[] = []

export const Presence: Component = (props) => {
  let exitState: MotionState | undefined

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
  })

  return (
    <UnmountContext.Provider
      value={{
        cleanup: (fn) => unmounts.add(fn),
        mount: (fn) => mounts.add(fn),
      }}
    >
      <OngoingStateContext.Provider value={() => exitState}>
        {untrack(() => {
          const resolved = children(() => props.children)
          const resolvedChild = createMemo(() => getSingleElement(resolved()))
          const [el, setEl] = createSignal<Element>()

          // initial run (appear)
          {
            const newEl = resolvedChild()
            if (newEl) {
              setEl(newEl)
              elIdArray.push(newEl)
              mountAll()
            }
          }

          createComputed(
            on(
              resolvedChild,
              (newEl) => {
                newEl && elIdArray.push(newEl)
                const prevEl = el()
                console.log("---")
                console.log("new in array", elIdArray.indexOf(newEl!))
                console.log("prev in array", elIdArray.indexOf(prevEl!))

                // exit
                if (!newEl) {
                  console.log("exit")

                  if (!prevEl) return setEl()
                  const state = mountedStates.get(prevEl)
                  if (!state) return setEl()

                  state.setActive("exit", true)
                  const onComplete = () => {
                    prevEl.removeEventListener("motioncomplete", onComplete)
                    setEl()
                    unmountAll()
                  }
                  prevEl.addEventListener("motioncomplete", onComplete)
                }

                // exit -> enter
                else if (prevEl) {
                  console.log("exit -> enter")

                  const state = mountedStates.get(prevEl)

                  const onComplete = () => {
                    prevEl.removeEventListener("motioncomplete", onComplete)
                    unmountAll()
                    setEl(newEl)
                    mountAll()
                  }

                  if (!state) onComplete()
                  else {
                    state.setActive("exit", true)
                    prevEl.addEventListener("motioncomplete", onComplete)
                  }
                }

                // enter
                else {
                  console.log("enter")

                  setEl(newEl)
                  mountAll()
                }
              },
              { defer: true }
            )
          )

          return el
        })}
      </OngoingStateContext.Provider>
    </UnmountContext.Provider>
  )
}
