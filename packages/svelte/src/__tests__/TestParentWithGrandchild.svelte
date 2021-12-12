<script type="ts">
  import Motion from "../Motion.svelte"

  export let parentProps: any = undefined
  export let childProps: any = undefined
  export let grandchildProps: any = undefined
</script>

<Motion data-testid="parent" {...parentProps}>
  <Motion data-testid="child" {...childProps}>
    <Motion data-testid="grandchild" {...grandchildProps} />
  </Motion>
</Motion>
