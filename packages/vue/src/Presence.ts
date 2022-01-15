import { defineComponent, h, onBeforeUpdate, provide, Transition } from "vue"
import { mountedStates } from "@motionone/dom"
import { presenceId, PresenceState } from "./context"

const doneCallbacks = new WeakMap<Element, VoidFunction>()

function removeDoneCallback(element: Element) {
  const prevDoneCallback = doneCallbacks.get(element)
  prevDoneCallback &&
    element.removeEventListener("motioncomplete", prevDoneCallback)
  doneCallbacks.delete(element)
}

export const Presence = defineComponent({
  name: "Presence",
  props: {
    name: { type: String },
    initial: {
      type: Boolean,
      default: true,
    },
    exitBeforeEnter: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    enter(element: Element) {
      const state = mountedStates.get(element)

      if (!state) return

      removeDoneCallback(element)
      state.setActive("exit", false)
    },
    exit(element: Element, done: VoidFunction) {
      const state = mountedStates.get(element)

      if (!state) return done()

      state.setActive("exit", true)

      removeDoneCallback(element)
      doneCallbacks.set(element, done)
      element.addEventListener("motioncomplete", done)
    },
  },
  setup({ initial }) {
    const state: PresenceState = { initial }

    provide(presenceId, state)

    onBeforeUpdate(() => {
      state.initial = undefined
    })
  },
  render() {
    return h(
      Transition,
      {
        name: this.name,
        onEnter: this.enter,
        onLeave: this.exit,
        css: false,
        mode: this.exitBeforeEnter ? "out-in" : undefined,
      },
      this.$slots.default
    )
  },
})
