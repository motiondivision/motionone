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
  batch,
} from "solid-js"
import type { ResolvedChildren } from "solid-js/types/reactive/signal"
import { mountedStates } from "@motionone/dom"
import { PresenceContext, ParentContext } from "./context"
import { isServer } from "solid-js/web"

const getSingleElement = (resolved: ResolvedChildren): Element | undefined => {
  resolved = Array.isArray(resolved) ? resolved[0] : resolved
  return resolved instanceof Element ? resolved : undefined
}

const addCompleteListener = (el: Element, fn: VoidFunction) => {
  const options: AddEventListenerOptions = { once: true }
  el.addEventListener("motioncomplete", fn, options)
  onCleanup(el.removeEventListener.bind(el, "motioncomplete", fn, options))
}

/**
 * Perform exit/enter trantisions of children `<Motion>` components.
 *
 * accepts props:
 * - `initial` – *(Defaults to `true`)* – If `false`, will disable the first animation on all child `Motion` elements the first time `Presence` is rendered.
 * - `exitBeforeEnter` – *(Defaults to `false`)* – If `true`, `Presence` will wait for the exiting element to finish animating out before animating in the next one.
 *
 * @example
 * ```tsx
 * <Presence exitBeforeEnter>
 *   <Show when={toggle()}>
 *     <Motion.div
 *       initial={{ opacity: 0 }}
 *       animate={{ opacity: 1 }}
 *       exit={{ opacity: 0 }}
 *     />
 *   </Show>
 * </Presence>
 * ```
 */
export const Presence: Component<{
  initial?: boolean
  exitBeforeEnter?: boolean
}> = (props) => {
  let { initial = true } = props
  onMount(() => (initial = true))

  let exiting = false
  let mounts: VoidFunction[] = []
  let newUnmounts: VoidFunction[] = []
  let exitUnmounts: VoidFunction[] = []

  onCleanup(() => {
    exitUnmounts.concat(newUnmounts).forEach((f) => f())
    newUnmounts = exitUnmounts = mounts = []
  })

  return (
    <PresenceContext.Provider
      value={{
        addCleanup: (fn) => newUnmounts.push(fn),
        addMount: (fn) => mounts.push(fn),
        initial: () => initial,
      }}
    >
      <ParentContext.Provider value={undefined}>
        {untrack(() => {
          if (isServer) return props.children

          // children need to be accessed under a context provider
          const resolved = children(() => props.children)
          const resolvedChild = createMemo(() => getSingleElement(resolved()))
          const [el, setEl] = createSignal<Element>()
          const [el2, setEl2] = createSignal<Element>()

          createComputed(
            on(resolvedChild, (newEl) => {
              exitUnmounts.push(...newUnmounts)
              newUnmounts = []

              batch(() => {
                // exit -> enter
                if (props.exitBeforeEnter) {
                  setEl()
                  exitTransition(() => !exiting && enterTransition(newEl))
                }
                // exit & enter
                else {
                  enterTransition(newEl)
                  exitTransition()
                }
              })
            })
          )

          return [el, el2]

          function enterTransition(el?: Element) {
            setEl(el)
            mounts.forEach((f) => f())
            mounts = []
          }

          function exitTransition(done?: VoidFunction) {
            const complete = () => {
              setEl2()
              exitUnmounts.forEach((f) => f())
              exitUnmounts = []
              done?.()
            }

            const exitEl = setEl2(el() ?? el2())
            if (!exitEl) return complete()
            const state = mountedStates.get(exitEl)
            if (!state || !(state.getOptions() as any).exit) return complete()

            state.setActive("exit", (exiting = true))
            addCompleteListener(exitEl, () => {
              exiting = false
              complete()
            })
          }
        })}
      </ParentContext.Provider>
    </PresenceContext.Provider>
  )
}
