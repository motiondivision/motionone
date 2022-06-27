<script type="ts">
  import { setContext, getContext, onMount, afterUpdate } from "svelte"
  import { contextKey } from "./utils/context"
  import {
    createMotionState,
    createStyleString,
    AnimationOptionsWithOverrides,
    MotionState,
    Variants,
    VariantDefinition,
    ViewOptions,
  } from "@motionone/dom"

  const parentState = getContext<MotionState | undefined>(contextKey)

  let element: Element

  export let initial: VariantDefinition | undefined = undefined
  export let animate: VariantDefinition | undefined = undefined
  export let hover: VariantDefinition | undefined = undefined
  export let press: VariantDefinition | undefined = undefined
  export let inView: VariantDefinition | undefined = undefined
  export let inViewOptions: InViewOptions | undefined = undefined
  export let variants: Variants | undefined = undefined
  export let transition: AnimationOptionsWithOverrides | undefined = undefined

  const state = createMotionState(
    {
      initial,
      animate,
      hover,
      press,
      inView,
      inViewOptions,
      variants,
      transition,
    },
    parentState
  )

  const initialStyle = createStyleString(state.getTarget())

  onMount(() => state.mount(element))

  afterUpdate(() => {
    state.update({
      initial,
      animate,
      hover,
      press,
      inView,
      inViewOptions,
      variants,
      transition,
    })
  })

  setContext(contextKey, state)
</script>

<div bind:this={element} {...$$restProps} style={initialStyle} on:click>
  <slot />
</div>
