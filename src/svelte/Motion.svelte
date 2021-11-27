<script type="ts">
  import { setContext, getContext, onMount, afterUpdate } from "svelte"
  import { contextKey } from "./utils/context"
  import { createStyleString } from "../dom/utils/style-string"
  import { createMotionState } from "../dom/state"
  import type {
    MotionState,
    Variants,
    VariantDefinition,
  } from "../dom/state/types"

  const parentState = getContext<MotionState | undefined>(contextKey)

  let element: Element

  export let initial: VariantDefinition | undefined = undefined
  export let hover: VariantDefinition | undefined = undefined
  export let press: VariantDefinition | undefined = undefined
  export let inView: VariantDefinition | undefined = undefined
  export let variants: Variants | undefined = undefined

  export let style = ""

  const state = createMotionState(
    {
      initial,
      hover,
      press,
      inView,
      variants,
    },
    parentState
  )

  const initialStyle = createStyleString(state.getTarget())

  onMount(() => state.mount(element))

  afterUpdate(() => {
    state.update({
      initial,
      hover,
      press,
      inView,
      variants,
    })
  })

  setContext(contextKey, state)
</script>

<div bind:this={element} {...$$restProps} style={initialStyle}>
  <slot />
</div>
