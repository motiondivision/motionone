import { Component } from "solid-js"
import { mountedStates, MotionState } from "@motionone/dom"
import { Transition } from "solid-transition-group"
import { UnmountContext, OngoingStateContext } from "./context"

export const Presence: Component = (props) => {
  let ongoingState: MotionState | undefined
  let removeListener: VoidFunction | undefined

  const onEnter = (el: Element, done: VoidFunction) => {
    if (removeListener) {
      removeListener?.()
      removeListener = undefined
    }

    const state = ongoingState ?? mountedStates.get(el)
    const onComplete = () => {
      removeListener = undefined
      done()
      ongoingState = undefined
    }

    if (!state) return onComplete()

    state.setActive("exit", false)
    el.addEventListener("motioncomplete", onComplete)
    removeListener = () => {
      el.removeEventListener("motioncomplete", onComplete)
      onComplete()
    }
  }

  const onExit = (el: Element, done: VoidFunction) => {
    if (removeListener) {
      removeListener?.()
      removeListener = undefined
    }

    const state = mountedStates.get(el)
    const onComplete = () => {
      removeListener = undefined
      unmounts.forEach((f) => f())
      done()
      ongoingState = undefined
    }

    if (!state) return onComplete()

    ongoingState = state
    state.setActive("exit", true)
    el.addEventListener("motioncomplete", onComplete)
    removeListener = () => {
      el.removeEventListener("motioncomplete", onComplete)
      onComplete()
    }
  }

  const unmounts = new Set<VoidFunction>()

  return (
    <UnmountContext.Provider value={(fn) => unmounts.add(fn)}>
      <OngoingStateContext.Provider value={() => ongoingState}>
        <Transition onEnter={onEnter} onExit={onExit} appear>
          {props.children}
        </Transition>
      </OngoingStateContext.Provider>
    </UnmountContext.Provider>
  )
}
