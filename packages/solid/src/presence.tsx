import { mountedStates } from "@motionone/dom"
import { resolveFirst } from "@solid-primitives/refs"
import { createSwitchTransition } from "@solid-primitives/transition-group"
import {
  createContext,
  createSignal,
  batch,
  type FlowComponent,
  type JSX,
  type Accessor,
} from "solid-js"
import { onCompleteExit } from "./primitives"
import type { Options } from "./types"

export type PresenceContextState = {
  initial: boolean
  mount: Accessor<boolean>
}
export const PresenceContext = createContext<PresenceContextState>()

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
export const Presence: FlowComponent<{
  initial?: boolean
  exitBeforeEnter?: boolean
}> = (props) => {
  const [mount, setMount] = createSignal(true),
    state = { initial: props.initial ?? true, mount },
    render = (
      <PresenceContext.Provider value={state}>
        {
          createSwitchTransition(
            resolveFirst(() => props.children),
            {
              appear: state.initial,
              mode: props.exitBeforeEnter ? "out-in" : "parallel",
              onExit(el, done) {
                batch(() => {
                  setMount(false)
                  ;(mountedStates.get(el)?.getOptions() as Options).exit
                    ? onCompleteExit(el, done)
                    : done()
                })
              },
              onEnter(_, done) {
                batch(() => {
                  setMount(true)
                  done()
                })
              },
            }
          ) as any as JSX.Element
        }
      </PresenceContext.Provider>
    )

  state.initial = true
  return render
}
