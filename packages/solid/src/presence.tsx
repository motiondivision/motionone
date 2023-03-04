import { createContext, FlowComponent } from "solid-js"
import { mountedStates } from "@motionone/dom"
import { resolveFirst } from "@solid-primitives/refs"
import { createSwitchTransition } from "@solid-primitives/transition-group"
import { ParentContext } from "./motion"
import { onCompleteExit } from "./primitives"
import { Options } from "./types"

export type PresenceContextState = () => boolean
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
  let initial = props.initial !== false

  const render = (
    <PresenceContext.Provider value={() => initial}>
      <ParentContext.Provider value={undefined}>
        {createSwitchTransition(
          resolveFirst(() => props.children),
          {
            appear: initial,
            mode: props.exitBeforeEnter ? "out-in" : "parallel",
            onExit(el, remove) {
              const state = mountedStates.get(el)
              if (state && (state.getOptions() as Options).exit)
                onCompleteExit(el, remove)
              else remove()
            },
          }
        )}
      </ParentContext.Provider>
    </PresenceContext.Provider>
  )

  initial = true
  return render
}
