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

const addCompleteListener = (el: Element, fn: VoidFunction): VoidFunction => {
  el.addEventListener("motioncomplete", fn)
  return () => el.removeEventListener("motioncomplete", fn)
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

  let exitListener: VoidFunction | undefined
  let mounts: VoidFunction[] = []

  const unmounts = new Map<Element, VoidFunction[]>()
  const unmountRoot = (el: Element) => {
    const fns = unmounts.get(el)
    if (!fns) return
    fns.forEach((f) => f())
    unmounts.delete(el)
  }
  const addUnmount = (fn: VoidFunction, el: Element) => {
    let fns = unmounts.get(el)
    if (!fns) unmounts.set(el, (fns = []))
    fns.push(fn)
  }

  onCleanup(() => {
    ;[...unmounts.values()].forEach((fns) => fns.forEach((f) => f()))
    unmounts.clear()
    exitListener?.()
    mounts = []
  })

  return (
    <PresenceContext.Provider
      value={{
        addCleanup: addUnmount,
        addMount: (fn) => mounts.push(fn),
        initial: () => initial,
      }}
    >
      <ParentContext.Provider value={{}}>
        {untrack(() => {
          if (isServer) return props.children

          // children need to be accessed under a context provider
          const resolved = children(() => props.children)
          const resolvedChild = createMemo(() => getSingleElement(resolved()))
          const [el, setEl] = createSignal<Element>()
          const [el2, setEl2] = createSignal<Element>()

          createComputed(
            on(resolvedChild, (newEl) => {
              exitListener?.()
              batch(() => {
                // exit -> enter
                if (props.exitBeforeEnter) {
                  setEl()
                  exitTransition(() => !exitListener && enterTransition(newEl))
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
              exitEl && unmountRoot(exitEl)
              done?.()
            }

            const exitEl = setEl2(el() ?? el2())
            if (!exitEl) return complete()
            const state = mountedStates.get(exitEl)
            if (!state) return complete()

            state.setActive("exit", true)
            exitListener = addCompleteListener(exitEl, () => {
              exitListener = undefined
              complete()
            })
          }
        })}
      </ParentContext.Provider>
    </PresenceContext.Provider>
  )
}
