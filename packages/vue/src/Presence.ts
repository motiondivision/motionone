import { defineComponent, h, Transition } from "vue"
import { mountedStates } from "@motionone/dom"

export const Presence = defineComponent({
  name: "Presence",
  props: {
    name: { type: String },
    tag: { type: String },
    singleChild: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    exit(element: Element, done: VoidFunction) {
      const state = mountedStates.get(element)

      state ? state.setActive("exit", true).then(done) : done()
    },
    exitCancelled(element: Element) {
      mountedStates.get(element)?.setActive("exit", false)
    },
  },
  render() {
    return h(
      Transition,
      {
        name: this.name,
        onEnter: this.exitCancelled,
        onLeave: this.exit,
        onLeaveCancelled: this.exitCancelled,
        css: false,
        mode: this.singleChild ? "out-in" : undefined,
      },
      this.$slots.default?.()
    )
  },
})
